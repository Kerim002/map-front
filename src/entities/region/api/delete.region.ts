import { apiInstance } from "@/shared/api/interceptor";

export const deleteRegion = async (id: string) => {
  await apiInstance(`/region/${id}`, {
    method: "DELETE",
  });
};
