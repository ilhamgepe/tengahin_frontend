"use server";
import { LoginSchema } from "@/lib/zod/authSchema";
import { CreateSession } from "../session";
import { redirect } from "next/navigation";
import { AuthResponse } from "@/types";

export async function LoginAction(formState: any, formData: FormData) {
  //  validation
  const validate = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validate.success) {
    return {
      errVal: validate.error.flatten().fieldErrors,
    };
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      }
    );

    if (res.ok) {
      const result: AuthResponse = await res.json();
      const session = await CreateSession({
        access_token: result.data.access_token,
        expires_at: result.data.expires_at,
        refresh_token: result.data.refresh_token,
        refresh_token_expires_at: result.data.refresh_token_expires_at,
        user: result.data.user,
      });
    } else {
      const result = await res.json();
      if (res.status === 400) {
        return {
          message: "failed to login",
          error: "invalid validation",
        };
      } else {
        return {
          message: "not registered",
          error: "this email is not registered",
        };
      }
    }
  } catch (err) {
    console.log("ERR CATCH IN LOGIN", err);
  }

  redirect("/");
}
