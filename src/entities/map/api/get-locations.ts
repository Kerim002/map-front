import { apiInstance } from "@/shared/api/interceptor";
import type { LocationQuery } from "./query/locations-query";
import type { LocationDto } from "./dto/location-dto";
import type { Location } from "../model/location";
import { mapLocation } from "./mapper/map-location";

type LocationQueryDto = {
  min_lat: number;
  max_lat: number;
  min_lon: number;
  max_lon: number;
};
export const getLocation = async (
  query: LocationQuery
): Promise<Location[]> => {
  const params: LocationQueryDto = {
    max_lat: query.maxLat,
    max_lon: query.maxLng,
    min_lat: query.minLat,
    min_lon: query.minLng,
  };

  const res = await apiInstance<LocationDto[]>("/location/", { params });

  return res.map(mapLocation);
};
