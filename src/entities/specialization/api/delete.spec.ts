import { apiInstance } from "@/shared/api/interceptor";

export const deleteSpec = async (id: string) => {
  await apiInstance(`/specialization/${id}`, {
    method: "DELETE",
  });
};
