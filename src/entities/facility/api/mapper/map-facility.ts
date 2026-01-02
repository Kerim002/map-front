import type { Facility } from "../../model/facility";
import type { FacilityDto } from "../dto/facility-dto";

export const mapFacility = (dto: FacilityDto): Facility => {
  return {
    createdAt: dto.created_at,
    geom: {
      lat: dto.geom.lat ?? 0,
      lng: dto.geom.lng ?? 0,
    },
    id: dto.id,
    updatedAt: dto.updated_at ?? "",
    address: dto.address,
    building: dto.building ?? undefined,
    company: dto.company ?? undefined,
    name: dto.name,
    region: dto.region ?? undefined
  };
};
