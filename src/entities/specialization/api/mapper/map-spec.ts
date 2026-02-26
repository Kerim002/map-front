import type { Spec } from "../../model/spec";
import type { SpecDto } from "../dto/spec-dto";

export const mapSpec = (dto: SpecDto): Spec => {
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
