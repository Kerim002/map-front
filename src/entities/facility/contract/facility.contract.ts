import z from "zod";

export const FacilityContract = z.object({
  name: z.string(),
  region: z
    .object({
      type: z.string(),
      id: z.string(),
    }),
  address: z.string().optional(),
  // company: z
  //   .object({
  //     name: z.string(),
  //     id: z.string(),
  //   }),
  building: z
    .object({
      type: z.string(),
      id: z.string(),
    }).optional(),
  performance: z
    .object({
      type: z.string(),
      id: z.string(),
    }).optional(),
  ownership: z
    .object({
      type: z.string(),
      id: z.string(),
    }),
  auhtority: z
    .object({
      type: z.string(),
      id: z.string(),
    }),
  cadaster: z.string().optional(),
  floor: z.coerce.number().optional(),
  area: z.coerce.number().optional(),
  parking: z.coerce.number().optional(),
  fireInspectAt: z.string().optional(),
  note: z.string().optional(),

});


