export type Ownership = {
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
};

export type OwnershipPagintion = {
  data: Ownership[];
  pageInfo: PageInfo;
};
