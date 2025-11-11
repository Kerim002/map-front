import { apiInstance } from "@/shared/api/interceptor";
import type { PerformanceMutation } from "../contract";

export const updatePerformance = async (
  body: PerformanceMutation & { id: string }
) => {
  await apiInstance(`/performance/${body.id}`, {
    method: "PATCH",
    json: {
      type: body.type,
    },
  });
};
