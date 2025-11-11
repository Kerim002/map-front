import { apiInstance } from "@/shared/api/interceptor";
import type { Building } from "../model/building";
import { mapBuilding } from "./mapper/map-building";
import type { BuildingDto } from "./dto/building-dto";

export const getBuildingDetails = async (id: string): Promise<Building> => {
  const res = await apiInstance<BuildingDto>(`/building/${id}`);
  return mapBuilding(res);
};
