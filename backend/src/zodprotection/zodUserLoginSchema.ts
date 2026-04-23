import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password is required must be 8 characteres long"),
});

export type LoginInput = z.infer<typeof LoginSchema>