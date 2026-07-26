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
      }),
    performance: z
      .object({
        type: z.string(),
        id: z.string(),
      }).optional(),
    // ownership: z.object({
    //   type: z.string(),
    //   id: z.string(),
    // }).optional(),
    auhtority: z.object({
      type: z.string(),
      id: z.string(),
    }).optional(),
    specialization: z.object({
      type: z.string(),
      id: z.string(),
    }).optional(),
    cadaster: isInChild
      ? z.string().nullable().optional()
      : z.string().min(1, "Cadaster is required"),
    floor: z.coerce.number().optional(),
    area: z.coerce.number().optional(),
    parking: z.coerce.number().optional(),
    fireInspectAt: z.string().optional(),
    licenseExpiredAt: z.string().optional(),
    visibility:z.boolean().optional(),
    city: z.object({
      type: z.string(),
      id: z.string(),
    }).optional(),
    district: z.object({
      type: z.string(),
      id: z.string(),
    }).optional(),
    note: z.string().optional(),
    lat: z.coerce.number(),
    lng: z.coerce.number(),
    color:z.string().optional(),
    number:z.string().optional()
  });
