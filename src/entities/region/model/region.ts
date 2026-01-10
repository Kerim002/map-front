export type Region = {
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  en: string,
  ru: string,
  tk: string
};

export type RegionPagination = {
  list: Region[];
  pageInfo: PageInfo;
};
