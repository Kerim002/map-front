import { apiInstance } from "@/shared/api/interceptor";
import type { AuthorityMutation } from "../contract";

export const updateAuthority = async (
  body: AuthorityMutation & { id: string }
) => {
  const {id, ...rest} = body
  await apiInstance(`/authority/${id}`, {
    method: "PUT",
    json: rest,
  });
};
