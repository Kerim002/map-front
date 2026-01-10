export type RegionDto = {
  id: string;
  type: string;
  created_at: null | string;
  updated_at: null | string;
    en:string,
  ru:string,
  tk:string
};

export type RegionPaginationDto = {
  data: RegionDto[];
  page_info: PageInfoDto;
};
