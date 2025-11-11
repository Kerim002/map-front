import { z } from "zod";

export const OwnershipContract = z.object({
  type: z.string().min(3),
});
