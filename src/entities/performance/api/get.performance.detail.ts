import { apiInstance } from "@/shared/api/interceptor";
import type { Performance } from "../model/performance";
import { mapPerformance } from "./mapper/map-performance";
import type { PerformanceDto } from "./dto/performance-dto";

export const getPerformanceDetail = async (
  id: string
): Promise<Performance> => {
  const res = await apiInstance<PerformanceDto>(`/performance/${id}`);

  return mapPerformance(res);
};
