import z from "zod";

const imageFile = z
  .instanceof(File)
  .refine((file) => file.size <= 5_000_000, {
    message: "Max image size is 5MB",
  });

export const CreateEmployeeContract = z.object({
  first_name: z.string().min(2),
  last_name: z.string().nullable().optional(),
  surname: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  position: z.string().nullable().optional(),

  avatar_original: imageFile.optional(),
  avatar_cropped: imageFile.optional(),
  // folder: z.object({
  //   id: z.string().min(1),
  //   name: z.string().min(1),
  // }).optional(),
});

export type EmployeCreateMutation = z.infer<typeof CreateEmployeeContract>;
