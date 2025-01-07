import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const RegisterSchema = z.object({
  username: z
    .string()
    .min(5, { message: "Username must be at least 5 characters" }),
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters" }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
