import { z } from "zod";

export const updateprofileschema = z.object({
  name:z.string().min(3,"User name should be greater then 3 character"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export type updateintput = z.infer<typeof updateprofileschema>