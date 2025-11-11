import type z from "zod";
import type { CreateCompanyContract } from "./company.contract";

export type CreateCompanyMutation = z.infer<typeof CreateCompanyContract>;
