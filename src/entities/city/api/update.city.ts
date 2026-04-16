import { apiInstance } from "@/shared/api/interceptor";
import type { CityMutation } from "../contract";

export const updateCity = async (body: CityMutation & { id: string }) => {
  const {id, ...rest} = body
  await apiInstance(`/city/${body.id}`, {
    method: "PUT",
    json: rest,
  });
};
