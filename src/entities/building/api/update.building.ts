import { apiInstance } from "@/shared/api/interceptor";
import type { BuildingMutation } from "../contract";

export const updateBuilding = async (
  body: BuildingMutation & { id: string }
) => {
  await apiInstance(`/building/${body.id}`, {
    method: "PATCH",
    json: {
      type: body.type,
    },
  });
};
