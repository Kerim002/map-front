export type BuildingDto = {
  id: string;
  type: string;
  created_at: string;
  updated_at: null | string;
};

export type BuildingPaginationDto = {
  data: BuildingDto[];
  page_info: PageInfoDto;
};
