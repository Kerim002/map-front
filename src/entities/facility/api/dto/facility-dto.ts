export type FacilityDto = {
  geom: {
    lat: number;
    lng: number;
  };
  id: string;
  created_at: string;
  updated_at: null | string;
  name: string;
  address: null | string;
  company: AttriubtesFacility
  building: AttriubtesFacility
  region:AttriubtesFacility
  authority: AttriubtesFacility
  ownership: AttriubtesFacility
  performance: AttriubtesFacility
  specialization: AttriubtesFacility,
  license_expired_at: null | string,
  has_children:boolean
  cadaster: null | string,
  note: string | null,
  area: number,
  floor: number,
  fire_inspection_at: null | string,
  parking: null | number,
  visibility: boolean,
    parent:{
    id: string;
    name: string;
  } | null
};


export type FacilityPagionationDto = {
  data: FacilityDto[]
  page_info: PageInfoDto
}

type AttriubtesFacility = {
    id: string;
    type: string
  } | null