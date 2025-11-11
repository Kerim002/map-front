export type Building = {
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
};

export type BuildingPagination = {
  data: Building[];
  pageInfo: PageInfo;
};
