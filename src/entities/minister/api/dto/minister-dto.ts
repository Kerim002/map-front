export type MinisterDto = {
  id: string;
  type: string;
  created_at: string;
  updated_at: string;
  en:string
  ru:string
  tk:string
};

export type MinisterPagionationDto = {
  data: MinisterDto[];
  page_info: PageInfoDto;
};
