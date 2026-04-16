import { type z } from "zod";
import { CityContract } from "./city.contract";

export type CityMutation = z.infer<typeof CityContract>;

export { CityContract };
