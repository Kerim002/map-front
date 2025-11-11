import type z from "zod";
import type { PerformanceContract } from "./performance.contract";

export type PerformanceMutation = z.infer<typeof PerformanceContract>;
