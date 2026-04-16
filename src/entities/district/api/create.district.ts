import { apiInstance } from "@/shared/api/interceptor";
import type {DistrictMutation } from "../contract";

export const createDistrict = async (json: DistrictMutation) => {
  await apiInstance("/district", {
    method: "POST",
    json,
  });
};
