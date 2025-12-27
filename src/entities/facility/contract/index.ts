import type z from "zod";
import type { FacilityContract } from "./facility.contract";

export type FaciltyMutation = z.infer<typeof FacilityContract>;
