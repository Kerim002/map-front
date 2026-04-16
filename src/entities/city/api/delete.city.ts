import { apiInstance } from "@/shared/api/interceptor";

export const deleteCity = async (id: string) => {
  await apiInstance(`/city/${id}`, {
    method: "DELETE",
  });
};
