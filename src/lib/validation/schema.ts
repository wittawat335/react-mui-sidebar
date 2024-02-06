import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(10, "Password must be at least 10 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export const ProductValidation = z.object({
  title: z.string().min(5),
  price: z.string().min(1),
});

export type TSignUpSchema = z.infer<typeof signUpSchema>;
export type productSchema = z.infer<typeof ProductValidation>;
