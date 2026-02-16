import type z from "zod";
import type { createFacilityContract } from "./facility.contract";

export type FaciltyMutation = z.infer<ReturnType<typeof createFacilityContract>>;
