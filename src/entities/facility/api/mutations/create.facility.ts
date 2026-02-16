import { apiInstance } from "@/shared/api/interceptor";
import type { FaciltyMutation } from "../../contract";

export type Geom = {
  lat: number;
  lng: number;
};

export type CreateBody = {
  lat: number;
  lng: number;
  name: string;
  address?: string;
  building_id?: string;
  region_id?: string
  cadaster: string,
  floor?: number,
  area?: number,
  note?: string,
  fire_inspect_at?: string,
  performance_id?: string,
  authority_id?: string
  ownership_id?: string
  parking?: number,
  parent_id?: string
};

export const createFacility = async (
  payload: FaciltyMutation & { geom: Geom, parent_id?: string }
) => {
  const performanceId = payload?.performance?.id;
  const authorityId = payload.auhtority.id;
  const ownershipId = payload.ownership.id;
  const building_id = payload.building?.id;
  const address = payload.address;
  const region_id = payload.region?.id

  const json: CreateBody = {
    name: payload.name,
    lat: payload.geom.lat,
    lng: payload.geom.lng,
    fire_inspect_at: payload.fireInspectAt ? new Date(payload.fireInspectAt).toISOString() : undefined,
    area: payload.area,
    cadaster: payload.cadaster ?? "",
    floor: payload.floor,
    note: payload.note,
    parking: payload.parking,
    parent_id: payload.parent_id,

    ...(address && { address: address }),
    ...(building_id && { building_id: building_id }),
    ...(ownershipId && { ownership_id: ownershipId }),
    ...(region_id && { region_id: region_id }),
    ...(authorityId && { authority_id: authorityId }),
    ...(performanceId && { performance_id: performanceId }),



  };

  await apiInstance("/location/", { json, method: "POST" });
};
