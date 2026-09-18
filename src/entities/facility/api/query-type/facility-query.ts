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
  city_id?:string
  district_id?:string
  authority_id?:string
  performance_id?:string
  ownership_id?:string
  specialization_id?:string
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
  specialization_id?:string
  viewport_width?:number
  viewport_height?:number
  city_id?:string
  district_id?:string
}


export type FacilityBoundQuery = {
  min_lat:number;
  min_lng:number;
  max_lat:number;
  max_lng:number;
  region_id?: string,
  building_id?: string,
  performance_id?:string
  authority_id?:string
  ownership_id?:string
  specialization_id?:string
  city_id?:string
  district_id?:string
}

