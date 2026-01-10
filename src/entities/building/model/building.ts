export type Building = {
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  en: string,
  ru: string,
  tk: string
};

export type BuildingPagination = {
  data: Building[];
  pageInfo: PageInfo;
};
