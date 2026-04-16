export type District = {
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  en: string,
  ru: string,
  tk: string
};

export type DistrictPagination = {
  list: District[];
  pageInfo: PageInfo;
};
