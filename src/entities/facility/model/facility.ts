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
  company: AttriubtesFacility;
  building: AttriubtesFacility,
  region: AttriubtesFacility,
  cadaster: null | string,
  note: string | null,
  area: number,
  floor: number,
  fireInspectionAt: null | string,
  parking: null | number,
  authority: AttriubtesFacility
  ownership: AttriubtesFacility
  performance: AttriubtesFacility
  specialization: AttriubtesFacility,
  licenseExpiredAt: null | string,
  visibility: boolean,
  hasChildren:boolean,
  parent:{
    id: string;
    name: string;
  } | null
};

type AttriubtesFacility = {
    id: string;
    type: string
  } | undefined


export type FacilityPagionation = {
  data: Facility[]
  pageInfo: PageInfo
}