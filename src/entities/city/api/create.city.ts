import { apiInstance } from "@/shared/api/interceptor";
import type { CityMutation } from "../contract";

export const createCity = async (json: CityMutation) => {
  await apiInstance("/city", {
    method: "POST",
    json,
  });
};
