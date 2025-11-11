import { type z } from "zod";
import { RegionContract } from "./region.contract";

export type RegionMutation = z.infer<typeof RegionContract>;

export { RegionContract };
