import { apiInstance } from "@/shared/api/interceptor";
import type { FaciltyMutation } from "../../contract";

export type CreateBody = {
  lat: number;
  lng: number;
  name: string;
  address?: string;
  company_id?: string;
  building_id?: string;
  region_id?: string

};

export const createFacility = async (
  payload: FaciltyMutation & { geom: Geom }
) => {
  const companyId = payload.company?.id;
  const building_id = payload.building?.id;
  const address = payload.address;
  const region_id = payload.region?.id

  const json: CreateBody = {
    name: payload.name,
    lat: payload.geom.lat,
    lng: payload.geom.lng,
    ...(address && { address: address }),
    ...(building_id && { building_id: building_id }),
    ...(companyId && { company_id: companyId }),
    ...(region_id && { region_id: region_id })
  };
  await apiInstance("/location/", { json, method: "POST" });
};
