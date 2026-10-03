import { apiInstance } from "@/shared/api/interceptor";
import type { MinisterMutation } from "../contract";

export const updateMinister = async (
  body: MinisterMutation & { id: string }
) => {
  const {id, ...rest} = body
  await apiInstance(`/ministers/${id}`, {
    method: "PUT",
    json: rest,
  });
};
