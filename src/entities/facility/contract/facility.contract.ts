import z from "zod";

export const FacilityContract = z.object({
  name: z.string(),
  region: z
    .object({
      type: z.string(),
      id: z.string(),
    })
    .optional(),
  address: z.string().optional(),
  company: z
    .object({
      name: z.string(),
      id: z.string(),
    })
    .optional(),
  building: z
    .object({
      type: z.string(),
      id: z.string(),
    })
    .optional(),
});


