import { apiInstance } from "@/shared/api/interceptor";
import type { BuildingMutation } from "../contract";

export const updateBuilding = async (
  body: BuildingMutation & { id: string }
) => {
  const {id, ...rest} = body
  await apiInstance(`/building/${id}`, {
    method: "PATCH",
    json: rest,
  });
};
