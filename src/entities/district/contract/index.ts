import { type z } from "zod";
import { DistrictContract } from "./district.contract";

export type DistrictMutation = z.infer<typeof DistrictContract>;

export { DistrictContract };
