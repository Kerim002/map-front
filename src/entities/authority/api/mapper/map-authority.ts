import type { Authority } from "../../model/authority";
import type { AuthorityDto } from "../dto/authority-dto";

export const mapAuthority = (dto: AuthorityDto): Authority => {
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
