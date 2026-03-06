import { apiInstance } from "@/shared/api/interceptor";
import type { FacilityQuery } from "../query-type/facility-query";
import type { FacilityDto } from "../dto/facility-dto";
import type { Facility } from "../../model/facility";
import { mapFacility } from "../mapper/map-facility";

type FacilityQueryDto = {
  min_lat: number;
  max_lat: number;
  min_lon: number;
  max_lon: number;
  region_id?: string;
  building_id?: string;
};
export const getFacility = async (
  query: FacilityQuery
): Promise<Facility[]> => {
  const params: FacilityQueryDto = {
    max_lat: query.maxLat,
    max_lon: query.maxLng,
    min_lat: query.minLat,
    min_lon: query.minLng,
    building_id: query.buildingId,
    region_id: query.regionId,
  };

  const res = await apiInstance<FacilityDto[]>("/location/", { params });

  return res.map(mapFacility);
};
