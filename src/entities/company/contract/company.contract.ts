import { z } from "zod";

export const CreateCompanyContract = z.object({
  name: z.string().min(2),
  cadasterCode: z.string().optional(),
  performance: z
    .object({
      name: z.string(),
      id: z.string(),
    })
    .optional(),
  ownership: z
    .object({
      name: z.string(),
      id: z.string(),
    })
    .optional(),
  authority: z
    .object({
      name: z.string(),
      id: z.string(),
    })
    .optional(),
  region: z
    .object({
      name: z.string(),
      id: z.string(),
    })
    .optional(),
});
