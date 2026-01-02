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
    id:string,
    type:string
  } | undefined,
  region:{
    type:string,
    id:string
  } | undefined
};
