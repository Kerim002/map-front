import { apiInstance } from "@/shared/api/interceptor";

export const deleteMinister = async (id: string) => {
  await apiInstance(`/ministers/${id}`, {
    method: "DELETE",
  });
};
