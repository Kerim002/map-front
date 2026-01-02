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
    type:string,
    id:string
  } | null;
  region:{
    type:string,
    id:string
  } | null
};
