import { apiInstance } from "@/shared/api/interceptor";
import type { SpecMutation } from "../contract";

export const createSpec = async (json: SpecMutation) => {
  await apiInstance("/specialization/", {
    method: "POST",
    json,
  });
};
