export type DistrictDto = {
  id: string;
  type: string;
  created_at: null | string;
  updated_at: null | string;
    en:string,
  ru:string,
  tk:string
};

export type DistrictPaginationDto = {
  data: DistrictDto[];
  page_info: PageInfoDto;
};
