import type { Building } from "../../model/building";
import type { BuildingDto } from "../dto/building-dto";

export const mapBuilding = (dto: BuildingDto): Building => {
  return {
    createdAt: dto.created_at,
    id: dto.id,
    type: dto.type,
    updatedAt: dto.updated_at ?? "",
       en:dto.en,
    ru:dto.ru,
    tk:dto.tk
  };
};
