import { apiInstance } from "@/shared/api/interceptor";
import type { OwnershipMutation } from "../contract";

export const createOwnership = async (body: OwnershipMutation) => {
  await apiInstance("/ownership", {
    method: "POST",
    json: body,
  });
};
