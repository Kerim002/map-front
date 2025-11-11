export type Authority = {
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
};

export type AuthorityPagionation = {
  data: Authority[];
  pageInfo: PageInfo;
};
