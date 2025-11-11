import { z } from "zod";
export const RegionContract = z.object({
  type: z.string().min(3),
});
