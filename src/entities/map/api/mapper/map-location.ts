import type { Location } from "../../model/location";
import type { LocationDto } from "../dto/location-dto";

export const mapLocation = (dto: LocationDto): Location => {
  return {
    createdAt: dto.created_at,
    geom: {
      lat: dto.geom.lat ?? 0,
      lng: dto.geom.lng ?? 0,
    },
    id: dto.id,
    updatedAt: dto.updated_at ?? "",
    address: dto.address,
    building: dto.building,
    company: dto.company,
    name: dto.name,
  };
};
