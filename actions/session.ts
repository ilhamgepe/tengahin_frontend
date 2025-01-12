"use server";
import { AuthResponse, SessionPayload } from "@/types";
import { compactDecrypt, CompactEncrypt, jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const secretkey = process.env.AUTH_SECRET!; // ambil secret key untuk sign jwt
const encryptionkey = process.env.ENCRYPTION_KEY!; // ambil key untuk encrypt atau membuat jwe
const encodedSecretkey = new TextEncoder().encode(secretkey); // encode secret key (di perlukan gatau kenapa mesti di encode)

const COOKIES_NAME = "GEPEGANTENG";
const ENCRYPTION_KEY = Buffer.from(encryptionkey, "base64"); // ini juga gatau kenapa butuh pake ini
const ENCRYPTION_ALG = "dir"; // algorithm untuk encrypt pakai direct
const ENCRYPTION_ENC = "A256GCM"; // encrypt pakai A256GCM

export async function CreateSession(payload: SessionPayload) {
  const expiresDate = new Date(payload.refresh_token_expires_at * 1000);
  const cookie = await cookies();
  try {
    // buat jwt dari payload
    const signedJWT = await new SignJWT({ ...payload })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuer("tengahin_web")
      .setIssuedAt(Date.now())
      .setExpirationTime(expiresDate)
      .sign(encodedSecretkey);

    // hasil signedJWT akan di encrypt jd jwe
    // sehingga payload tidak bisa di baca secara langsung tanpa encryp key yang cocok
    const jwe = await new CompactEncrypt(new TextEncoder().encode(signedJWT))
      .setProtectedHeader({ alg: ENCRYPTION_ALG, enc: ENCRYPTION_ENC })
      .encrypt(ENCRYPTION_KEY);

    cookie.set("GEPEGANTENG", jwe, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: expiresDate,
      sameSite: "lax",
      path: "/",
    });

    return true;
  } catch (error) {
    console.error("Error creating session:", error);
    return false;
  }
}

export async function GetSession() {
  const cookie = await cookies();
  try {
    const encryptedSEssion = cookie.get("GEPEGANTENG")?.value;

    if (!encryptedSEssion) return null;

    // decrypt jwe
    const { plaintext } = await compactDecrypt(
      encryptedSEssion,
      ENCRYPTION_KEY
    );

    // verif jwt
    const jwt = new TextDecoder().decode(plaintext);
    const { payload } = await jwtVerify<SessionPayload>(jwt, encodedSecretkey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error("Failed to get session:", error);
    if (error instanceof Error) {
      console.error("Error message IN GETSESSION:", error.message);
      console.error("Error stack IN GETSESSION:", error.stack);
    }
    return null;
  }
}

export async function DeleteSession() {
  const cookie = await cookies();
  cookie.delete("GEPEGANTENG");
}

export async function UpdateToken({
  access_token,
  refresh_token,
  refresh_token_expires_at,
}: {
  access_token: string;
  refresh_token: string;
  refresh_token_expires_at: number;
}) {
  try {
    const session = await GetSession();
    if (!session) return null;

    await CreateSession({
      ...session,
      access_token,
      refresh_token,
      refresh_token_expires_at,
    });
  } catch (error) {
    console.error("Failed to update token:", error);
    DeleteSession();
    redirect("/login");
  }
}

export async function RefreshToken(oldRefreshToken: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh_token: oldRefreshToken,
        }),
      }
    );

    if (!res.ok) throw new Error("Failed to refresh token");

    const authRes: AuthResponse = await res.json();

    await UpdateToken({
      access_token: authRes.data.access_token,
      refresh_token: authRes.data.refresh_token,
      refresh_token_expires_at: authRes.data.refresh_token_expires_at,
    });
    return authRes.data.access_token;
  } catch (error) {
    console.log("FAILED TO REFRESH TOKEN", error);
    return null;
  }
}

export async function ExchangeRefreshToken(refreshToken: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh_token: refreshToken,
        }),
      }
    );

    if (!res.ok) {
      console.log("faild to refresh token from session.ts 67");
      throw new Error("Failed to refresh token");
    }

    const authRes: AuthResponse = await res.json();

    // create session
    return await CreateSession({
      access_token: authRes.data.access_token,
      expires_at: authRes.data.expires_at,
      refresh_token: authRes.data.refresh_token,
      refresh_token_expires_at: authRes.data.refresh_token_expires_at,
      user: authRes.data.user,
    });
  } catch (err) {
    console.error("failed to refresh token in 80 session.ts", err);
    return false;
  }
}
