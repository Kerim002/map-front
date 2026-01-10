import { z } from "zod";

export const AuthorityContract = z.object({
  en: z.string().min(2),
  ru: z.string().min(2),
  tk: z.string().min(2),
});
