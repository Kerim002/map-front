import { apiInstance } from "@/shared/api/interceptor";
import type { AuthorityMutation } from "../contract";

export const updateAuthority = async (
  body: AuthorityMutation & { id: string }
) => {
  await apiInstance(`/authority/${body.id}`, {
    method: "PATCH",
    json: {
      type: body.type,
    },
  });
};
