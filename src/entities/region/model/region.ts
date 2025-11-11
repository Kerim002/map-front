export type Region = {
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
};

export type RegionPagination = {
  list: Region[];
  pageInfo: PageInfo;
};
