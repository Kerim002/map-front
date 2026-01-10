export type Facility = {
  geom: {
    lng: number;
    lat: number;
  };
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  address: null | string;
  company: {
    id: string;
    type: string;
  } | undefined;
  building: {
    id: string,
    type: string
  } | undefined,
  region: {
    type: string,
    id: string
  } | undefined,
  cadaster: null | string,
  note: string | null,
  // images: [] | null,
  // working_days: [] | null,
  area: number,
  floor: number,
  fireInspectionAt: null | string,
  parking: null | number,
  authority: {
    id: string;
    type: string
  } | undefined
  ownership: {
    id: string;
    type: string
  } | undefined
  performance: {
    id: string;
    type: string
  } | undefined
};


export type FacilityPagionation = {
  data: Facility[]
  pageInfo: PageInfo
}