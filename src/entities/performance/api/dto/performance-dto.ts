export type PerformanceDto = {
  id: string;
  type: string;
  created_at: string;
  updated_at: string | null;
    en:string,
  ru:string,
  tk:string
};

export type PerformancePaginationDto = {
  data: PerformanceDto[];
  page_info: PageInfoDto;
};
