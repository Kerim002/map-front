import z from "zod";

export const CreateEmployeeContract = z.object({
    first_name: z.string().min(2, { message: "minimum-2-char" }),
    last_name: z.string().min(2, { message: "minimum-2-char" }),
    email: z.string().min(2, { message: "minimum-2-char" }),
    phone: z.string().min(2, { message: "minimum-2-char" }),
    position: z.string().min(2, { message: "minimum-2-char" }),
    avatar: z.instanceof(File).refine((file) => file.size <= 5000000, {
        message: "Max image size is 5MB",
    }).optional(),
})

export type EmployeCreateMutation = z.infer<typeof CreateEmployeeContract>;
