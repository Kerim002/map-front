import { apiInstance } from "@/shared/api/interceptor";

export const deleteAuthority = async (id: string) => {
  await apiInstance(`/authority/${id}`, {
    method: "DELETE",
  });
};
