import { apiInstance } from "@/shared/api/interceptor";
import type { Facility } from "../../model/facility";
import type { FacilityDto } from "../dto/facility-dto";
import { mapFacility } from "../mapper/map-facility";

export const getDetailFacility = async (id: string): Promise<Facility> => {
  const res = await apiInstance<FacilityDto>(`/location/${id}`);

  return mapFacility(res);
};
