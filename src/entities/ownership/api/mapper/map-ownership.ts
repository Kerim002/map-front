import type { Ownership } from "../../model/ownership";
import type { OwnershipDto } from "../dto/ownership-dto";

export const mapOwnership = (dto: OwnershipDto): Ownership => {
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
