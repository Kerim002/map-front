import { apiInstance } from "@/shared/api/interceptor";
import type { SpecMutation } from "../contract";

export const updateSpec = async (body: SpecMutation & { id: string }) => {
  const {id, ...rest} = body
  await apiInstance(`/specialization/${id}`, {
    method: "PATCH",
    json: rest,
  });
};
