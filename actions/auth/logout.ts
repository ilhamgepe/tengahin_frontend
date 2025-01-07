"use server";
import { DeleteSession, GetSession } from "@/actions/session";
import { redirect } from "next/navigation";

export async function Logout(formState: any, formData: FormData) {
  const session = await GetSession();
  if (!session)
    return {
      message: "session not found",
    };

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
      {
        body: JSON.stringify({
          refresh_token: session.refresh_token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    );
    if (!res.ok) {
      console.log("FAILED TO LOGOUT", res.status);
      throw new Error("failed to logout");
    }

    await DeleteSession();
  } catch (err: any) {
    console.log("FAILED TO LOGOUT in CATCH", err);

    return {
      message: err.message,
    };
  }
  redirect("/login");
}
