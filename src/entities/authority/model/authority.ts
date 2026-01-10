export type Authority = {
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
    en:string
  ru:string
  tk:string
};

export type AuthorityPagionation = {
  data: Authority[];
  pageInfo: PageInfo;
};
