export type FacilityQuery = {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
  companyId?: string;
  regionId?: string;
  buildingId?: string;

};


export type FacilitySearchQuery = {
  q?: string,
  company_id?: string,
  region_id?: string,
  building_id?: string,
  page: number,
  limit: number,
  parent_id?: string
}



export type FacilityZoomQuery = {
  lat: number;
  lng: number;
  zoom: number;
  company_id?: string,
  region_id?: string,
  building_id?: string,
  performance_id?:string
  authority_id?:string
  ownership_id?:string
}

