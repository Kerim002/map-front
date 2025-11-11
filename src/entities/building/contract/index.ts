import { type z } from "zod";
import { BuildingContract } from "./building.contract";
export type BuildingMutation = z.infer<typeof BuildingContract>;
