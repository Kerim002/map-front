export type Performance = {
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
};

export type PerformancePagination = {
  data: Performance[];
  pageInfo: PageInfo;
};
