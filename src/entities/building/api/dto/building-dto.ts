export type BuildingDto = {
  id: string;
  type: string;
  created_at: string;
  updated_at: null | string;
  en:string,
  ru:string,
  tk:string
};

export type BuildingPaginationDto = {
  data: BuildingDto[];
  page_info: PageInfoDto;
};
