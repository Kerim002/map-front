import { z } from "zod";

export const createFacilityContract = (isInChild: boolean) =>
  z.object({
    name: z.string(),

    region: z.object({
      type: z.string(),
      id: z.string(),
    }),

    address: z.string().optional(),

    building: z
      .object({
        type: z.string(),
        id: z.string(),
      })
      .optional(),

    performance: z
      .object({
        type: z.string(),
        id: z.string(),
      })
      .optional(),

    ownership: z.object({
      type: z.string(),
      id: z.string(),
    }),

    auhtority: z.object({
      type: z.string(),
      id: z.string(),
    }),
    specialization: z.object({
      type: z.string(),
      id: z.string(),
    }),

    // 👇 conditional
    cadaster: isInChild
      ? z.string().nullable().optional()
      : z.string().min(1, "Cadaster is required"),

    floor: z.coerce.number().optional(),
    area: z.coerce.number().optional(),
    parking: z.coerce.number().optional(),
    fireInspectAt: z.string().optional(),
    licenseExpiredAt: z.string().optional(),
    visibility:z.boolean().optional(),
    
    note: z.string().optional(),
  });
