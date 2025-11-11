import { z } from "zod";

export const AuthorityContract = z.object({
  type: z.string().min(3),
});
