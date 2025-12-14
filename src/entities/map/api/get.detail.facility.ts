import { apiInstance } from "@/shared/api/interceptor";
import type { Location } from "../model/location";
import type { LocationDto } from "./dto/location-dto";
import { mapLocation } from "./mapper/map-location";

export const getDetailFacility = async (id: string): Promise<Location> => {
  const res = await apiInstance<LocationDto>(`/location/${id}`);

  return mapLocation(res);
};
