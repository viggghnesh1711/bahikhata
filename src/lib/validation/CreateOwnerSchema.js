import {z} from 'zod';

export const CreateOwnerSchema = z.object({
    email: z
    .string()
    .email("Invalid email address"),
  password: z
    .string()
    .min(5, "Password must be at least 5 characters long")
    .max(100, "Password too long"),
})
