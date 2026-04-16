export type CityDto = {
  id: string;
  type: string;
  created_at: null | string;
  updated_at: null | string;
    en:string,
  ru:string,
  tk:string
};

export type CityPaginationDto = {
  data: CityDto[];
  page_info: PageInfoDto;
};
