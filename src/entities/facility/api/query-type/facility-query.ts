export type FacilityQuery = {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
  regionId?: string;
  buildingId?: string;

};


export type FacilitySearchQuery = {
  q?: string,
  region_id?: string,
  building_id?: string,
  page: number,
  limit: number,
  parent_id?: string,
  rental?:boolean
}



export type FacilityZoomQuery = {
  lat: number;
  lng: number;
  zoom: number;
  region_id?: string,
  building_id?: string,
  performance_id?:string
  authority_id?:string
  ownership_id?:string
}

