import { type z } from "zod";
import { MinisterContract } from "./minister.contract";
export type MinisterMutation = z.infer<typeof MinisterContract>;
