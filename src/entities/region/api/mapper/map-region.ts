import type { Region } from "../../model/region";
import type { RegionDto } from "../dto/region-dto";

export const mapRegion = (dto: RegionDto): Region => {
  return {
    createdAt: dto.created_at ?? "",
    id: dto.id,
    type: dto.type,
    updatedAt: dto.updated_at ?? "",
    en: dto.en,
    ru: dto.ru,
    tk: dto.tk
  };
};
