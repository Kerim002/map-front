import { apiInstance } from "@/shared/api/interceptor";
import type { MinisterMutation } from "../contract";

export const createMinister = async (body: MinisterMutation) => {
  await apiInstance("/ministers", {
    method: "POST",
    json: body,
  });
};
