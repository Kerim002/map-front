import { apiInstance } from "@/shared/api/interceptor";

export const deleteBuilding = async (id: string) => {
  await apiInstance(`/building/${id}`, {
    method: "DELETE",
  });
};
