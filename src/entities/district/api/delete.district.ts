import { apiInstance } from "@/shared/api/interceptor";

export const deleteDistrict = async (id: string) => {
  await apiInstance(`/district/${id}`, {
    method: "DELETE",
  });
};
