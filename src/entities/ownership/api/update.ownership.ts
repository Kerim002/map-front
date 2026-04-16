import { apiInstance } from "@/shared/api/interceptor";
import type { OwnershipMutation } from "../contract";

export const updateOwnership = async (
  body: OwnershipMutation & { id: string }
) => {
  const {id, ...rest} = body
  await apiInstance(`/ownership/${id}`, {
    method: "PUT",
    json: rest
  });
};
