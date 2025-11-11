export type PerformanceDto = {
  id: string;
  type: string;
  created_at: string;
  updated_at: string | null;
};

export type PerformancePaginationDto = {
  data: PerformanceDto[];
  page_info: PageInfoDto;
};
