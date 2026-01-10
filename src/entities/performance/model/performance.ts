export type Performance = {
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
    en:string,
  ru:string,
  tk:string
};

export type PerformancePagination = {
  data: Performance[];
  pageInfo: PageInfo;
};
