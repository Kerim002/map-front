import { apiInstance } from "@/shared/api/interceptor";
import type { Ownership } from "../model/ownership";
import { mapOwnership } from "./mapper/map-ownership";
import type { OwnershipDto } from "./dto/ownership-dto";

export const getOwnershipDetail = async (id: string): Promise<Ownership> => {
  const res = await apiInstance<OwnershipDto>(`/ownership/${id}`);

  return mapOwnership(res);
};
