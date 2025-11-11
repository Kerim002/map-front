import { apiInstance } from "@/shared/api/interceptor";
import type { Region } from "../model/region";
import type { RegionDto } from "./dto/region-dto";
import { mapRegion } from "./mapper/map-region";

export const getRegionDetails = async (id: string): Promise<Region> => {
  const res = await apiInstance<RegionDto>(`/region/${id}`);
  return mapRegion(res);
};
