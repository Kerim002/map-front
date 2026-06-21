import z from "zod";

export const CreateUserContract = z.object({
    username: z.string(),
    name: z.string(),
    surname: z.string(),
    phone: z.string(),
    role: z.string(),
    password: z.string().min(4, { message: "Minimum 8 character or number" })
})

export const UpdateUserContract = z.object({
    username: z.string().optional(),
    name: z.string().optional(),
    surname: z.string().optional(),
    phone: z.string().optional(),
    role: z.string().optional(),
    password: z.string().optional()
}) 