import type { City } from "../../model/city";
import type { CityDto } from "../dto/city-dto";

export const mapCity = (dto: CityDto): City => {
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
