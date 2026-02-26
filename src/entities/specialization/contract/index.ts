import { type z } from "zod";
import { SpecContract } from "./spec.contract";

export type SpecMutation = z.infer<typeof   SpecContract>;

export { SpecContract };
