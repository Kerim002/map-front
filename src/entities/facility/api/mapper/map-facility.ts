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
    region: dto.region ?? undefined,
    area:dto.area,
    cadaster:dto.cadaster,
    fireInspectionAt:dto.fire_inspection_at ? dto.fire_inspection_at.split('T')[0] : null,
    floor:dto.floor,
    note:dto.note,
    parking:dto.parking,
    authority:dto.authority ?? undefined,
    ownership:dto.ownership ?? undefined,
    performance:dto.performance ?? undefined,
    hasChildren:dto.has_children
    
  };
};
