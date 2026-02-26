import { apiInstance } from "@/shared/api/interceptor";
import type { Spec } from "../model/spec";
import type { SpecDto } from "./dto/spec-dto";
import { mapSpec } from "./mapper/map-spec";

export const getSpecDetails = async (id: string): Promise<Spec> => {
  const res = await apiInstance<SpecDto>(`/specialization/${id}`);
  return mapSpec(res);
};
