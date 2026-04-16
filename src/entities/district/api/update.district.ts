import { apiInstance } from "@/shared/api/interceptor";
import type { DistrictMutation } from "../contract";

export const updateDistrict = async (body: DistrictMutation & { id: string }) => {
  const {id, ...rest} = body
  await apiInstance(`/district/${body.id}`, {
    method: "PUT",
    json: rest,
  });
};
