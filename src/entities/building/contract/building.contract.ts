import { z } from "zod";

export const BuildingContract = z.object({
  type: z.string().min(3),
});
