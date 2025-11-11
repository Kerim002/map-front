import { apiInstance } from "@/shared/api/interceptor";

export const deletePerformance = async (id: string) => {
  await apiInstance(`/performance/${id}`, {
    method: "DELETE",
  });
};
