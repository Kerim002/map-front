import z from "zod";

const imageFile = z
  .instanceof(File)
  .refine((file) => file.size <= 5_000_000, {
    message: "Max image size is 5MB",
  });

export const CreateEmployeeContract = z.object({
  first_name: z.string().min(2),
  last_name: z.string().min(2),
  surname: z.string().min(2),
  email: z.string().min(2),
  phone: z.string().min(2),
  position: z.string().min(2),

  avatar_original: imageFile.optional(),
  avatar_cropped: imageFile.optional(),
  folder: z.object({
    id: z.string().min(1),
    name: z.string().min(1),
  }),
});

export type EmployeCreateMutation = z.infer<typeof CreateEmployeeContract>;
