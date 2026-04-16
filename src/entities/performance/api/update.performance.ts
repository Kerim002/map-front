import { apiInstance } from "@/shared/api/interceptor";
import type { PerformanceMutation } from "../contract";

export const updatePerformance = async (
  body: PerformanceMutation & { id: string }
) => {
  const {id, ...rest} = body
  await apiInstance(`/performance/${id}`, {
    method: "PUT",
    json:rest
  });
};
