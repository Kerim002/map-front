import { apiInstance } from "@/shared/api/interceptor";
import type { OwnershipMutation } from "../contract";

export const updateOwnership = async (
  body: OwnershipMutation & { id: string }
) => {
  await apiInstance(`/ownership/${body.id}`, {
    method: "PATCH",
    json: {
      type: body.type,
    },
  });
};
