"use client";
import { LoginAction } from "@/actions/auth/login";
import AlertError from "@/components/ui/alertError";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import InputError from "@/components/ui/inputError";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useActionState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";

const LoginPage = () => {
  const [state, action] = useActionState(LoginAction, undefined);
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome back</CardTitle>
        <CardDescription>
          Login with your Apple or Google account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div className="grid gap-6">
            <div className="flex flex-col gap-4">
              <a
                href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/github`}
                className={cn("w-full", buttonVariants({ variant: "outline" }))}
              >
                <FaGithub />
                Login with Github
              </a>
              <a
                href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`}
                className={cn("w-full", buttonVariants({ variant: "outline" }))}
              >
                <FaGoogle />
                Login with Google
              </a>
            </div>
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
            <form action={action} className="flex flex-col gap-6">
              <AlertError title={"Error"} message={state?.error} />
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@mail.com"
                  required
                  name="email"
                />
                <InputError message={state?.errVal?.email} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  required
                  name="password"
                />
                <InputError message={state?.errVal?.password} />
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full"
                  // disabled={fetcher.state !== "idle"}
                >
                  Login
                </Button>
              </div>
            </form>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginPage;
