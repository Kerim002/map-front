import { z } from "zod";

export const PerformanceContract = z.object({
  type: z.string().min(3),
});
