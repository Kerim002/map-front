export type SpecDto = {
  id: string;
  type: string;
  created_at: null | string;
  updated_at: null | string;
    en:string,
  ru:string,
  tk:string
};

export type SpecPaginationDto = {
  data:SpecDto[];
  page_info: PageInfoDto;
};
