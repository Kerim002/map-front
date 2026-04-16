import type { District } from "../../model/district";
import type { DistrictDto } from "../dto/district-dto";

export const mapDistrict = (dto: DistrictDto): District => {
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
