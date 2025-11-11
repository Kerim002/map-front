import { apiInstance } from "@/shared/api/interceptor";
import type { RegionMutation } from "../contract";

export const updateRegion = async (body: RegionMutation & { id: string }) => {
  await apiInstance(`/region/${body.id}`, {
    method: "PATCH",
    json: {
      type: body.type,
    },
  });
};
