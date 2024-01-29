import { z } from "zod";

// ============================================================
// USER
// ============================================================

export const SignupValidation = z
  .object({
    fullname: z
      .string()
      .min(2, { message: "Name must be at least 2 characters." }),
    username: z
      .string()
      .min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email(),
    password: z
      .string()
      .min(5, { message: "Password must be at least 5 characters." }),
    confirmPassword: z
      .string()
      .min(5, { message: "Password must be at least 5 characters." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type TSignUpSchema = z.infer<typeof SignupValidation>;
