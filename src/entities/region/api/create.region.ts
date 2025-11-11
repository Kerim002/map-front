import { apiInstance } from "@/shared/api/interceptor";
import type { RegionMutation } from "../contract";

export const createRegion = async (json: RegionMutation) => {
  await apiInstance("/region/", {
    method: "POST",
    json,
  });
};
