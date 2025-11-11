export type RegionDto = {
  id: string;
  type: string;
  created_at: null | string;
  updated_at: null | string;
};

export type RegionPaginationDto = {
  data: RegionDto[];
  page_info: PageInfoDto;
};
