export type Ownership = {
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
    en:string,
  ru:string,
  tk:string
};

export type OwnershipPagintion = {
  data: Ownership[];
  pageInfo: PageInfo;
};
