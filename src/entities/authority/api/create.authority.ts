import { apiInstance } from "@/shared/api/interceptor";
import type { AuthorityMutation } from "../contract";

export const createAuthority = async (body: AuthorityMutation) => {
  await apiInstance("/authority", {
    method: "POST",
    json: body,
  });
};
