import { apiInstance } from "@/shared/api/interceptor";
import type { District } from "../model/district";
import type { DistrictDto } from "./dto/district-dto";
import { mapDistrict} from "./mapper/map-district";

export const getDistrictDetails = async (id: string): Promise<District> => {
  const res = await apiInstance<DistrictDto>(`/district/${id}`);
  return mapDistrict(res);
};
