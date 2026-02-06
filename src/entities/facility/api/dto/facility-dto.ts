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
  has_children:boolean
  cadaster: null | string,
  note: string | null,
  // images: [] | null,
  // working_days: [] | null,
  area: number,
  floor: number,
  fire_inspection_at: null | string,
  parking: null | number
};


export type FacilityPagionationDto = {
  data: FacilityDto[]
  page_info: PageInfoDto
}

type AttriubtesFacility = {
    id: string;
    type: string
  } | null