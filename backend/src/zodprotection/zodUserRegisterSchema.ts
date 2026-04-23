import {z} from 'zod'



export const RegisterSchema = z.object({
    name:z.string().min(3,"User name should be greater then 3 character"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),

})

export type RegisterInput = z.infer<typeof RegisterSchema>;