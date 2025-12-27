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
    name: string;
  } | null;
  building: null | string;
};
