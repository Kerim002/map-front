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
    name: string;
  } | null;
  building: null | string;
};
