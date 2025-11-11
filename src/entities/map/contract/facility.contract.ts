import z from "zod";

export const FacilityContract = z.object({
  name: z.string(),
  region: z
    .object({
      name: z.string(),
      id: z.string(),
    })
    .nullable(),

  category: z
    .object({
      name: z.string(),
      id: z.string(),
    })
    .nullable(),
  address: z.string().nullable(),
});
