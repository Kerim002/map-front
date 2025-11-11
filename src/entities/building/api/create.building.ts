import { apiInstance } from "@/shared/api/interceptor";
import type { BuildingMutation } from "../contract";

export const createBuilding = async (body: BuildingMutation) => {
  await apiInstance("/building/", {
    method: "POST",
    json: body,
  });
};
