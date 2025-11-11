import { apiInstance } from "@/shared/api/interceptor";

export const deleteCompany = async (id: string) => {
  await apiInstance(`/company/${id}`, {
    method: "DELETE",
  });
};
