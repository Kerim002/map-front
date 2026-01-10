export type OwnershipDto = {
  id: string;
  type: string;
  created_at: string;
  updated_at: null | string;
    en:string,
  ru:string,
  tk:string
};

export type OwnershipPagintionDto = {
  data: OwnershipDto[];
  page_info: PageInfoDto;
};
