export type FacilityDto = {
  id: string;
  name: string;
  geom: {
    lat: number;
    lng: number;
  };
  cadaster: null | string,
  note: string | null,
  address: null | string;
  visibility: boolean,
  rental:boolean
  performance: AttriubtesFacility
  authority: AttriubtesFacility
  // ownership: AttriubtesFacility
  specialization: AttriubtesFacility,
  building: AttriubtesFacility
  region:AttriubtesFacility
  city:AttriubtesFacility,
  district:AttriubtesFacility
  parent:{
    id: string;
    name: string;
  } | null,
  has_children:boolean
  area: number,
  floor: number,
  parking: null | number,
  fire_inspection_at: null | string,
  license_expired_at: null | string,
  created_at: string;
  updated_at: null | string;
};


export type FacilityPagionationDto = {
  data: FacilityDto[]
  page_info: PageInfoDto
}

type AttriubtesFacility = {
    id: string;
    type: string
  } | null