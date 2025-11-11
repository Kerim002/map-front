import { apiInstance } from "@/shared/api/interceptor";
import type { PerformanceMutation } from "../contract";

export const createPerformance = async (body: PerformanceMutation) => {
  await apiInstance("/performance/", {
    method: "POST",
    json: body,
  });
};
