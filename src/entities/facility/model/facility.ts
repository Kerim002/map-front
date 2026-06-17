export type Facility = {
  id: string;
  name: string;
  geom: {
    lng: number;
    lat: number;
  };
  cadaster: null | string,
  note: string | null,
  address: null | string;
  visibility: boolean,
  rental: boolean
  performance: AttriubtesFacility
  authority: AttriubtesFacility
  // ownership: AttriubtesFacility
  specialization: AttriubtesFacility,
  building: AttriubtesFacility,
  region: AttriubtesFacility,
  city:AttriubtesFacility,
  district:AttriubtesFacility
  parent: {
    id: string;
    name: string;
  } | null
  hasChildren: boolean,
  area: number,
  floor: number,
  parking: null | number,
  fireInspectionAt: null | string,
  licenseExpiredAt: null | string,
  createdAt: string;
  updatedAt: string;
};

type AttriubtesFacility = {
  id: string;
  type: string
} | undefined


export type FacilityPagionation = {
  data: Facility[]
  pageInfo: PageInfo
}