import type { Minister } from "../../model/minister";
import type { MinisterDto } from "../dto/minister-dto";

export const mapMinister = (dto: MinisterDto): Minister => {
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
