import { type z } from "zod";
import { AuthorityContract } from "./authority.contract";
export type AuthorityMutation = z.infer<typeof AuthorityContract>;
