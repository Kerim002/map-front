export type AuthorityDto = {
  id: string;
  type: string;
  created_at: string;
  updated_at: string;
};

export type AuthorityPagionationDto = {
  data: AuthorityDto[];
  page_info: PageInfoDto;
};
