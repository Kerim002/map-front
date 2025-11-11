import { apiInstance } from "@/shared/api/interceptor";

export const deleteOwnership = async (id: string) => {
  await apiInstance(`/ownership/${id}`, {
    method: "DELETE",
  });
};
