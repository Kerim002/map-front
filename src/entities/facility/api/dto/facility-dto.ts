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
  company: {
    id: string;
    type: string;
  } | null;
  building: {
    type: string,
    id: string
  } | null;
  region: {
    type: string,
    id: string
  } | null;
  authority: {
    id: string;
    type: string
  }
  ownership: {
    id: string;
    type: string
  } | null
  performance: {
    id: string;
    type: string
  } | null

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