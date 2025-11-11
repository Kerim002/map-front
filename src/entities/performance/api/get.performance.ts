import { apiInstance } from "@/shared/api/interceptor";
import type { PerformancePagination } from "../model/performance";
import type { PerformancePaginationDto } from "./dto/performance-dto";
import { mapPerformance } from "./mapper/map-performance";

export const getPerformance = async (
  params: PageBaseQuery
): Promise<PerformancePagination> => {
  const res = await apiInstance<PerformancePaginationDto>(`/performance/`, {
    params,
  });

  const { has_next_page, has_previous_page, limit, page, total_pages } =
    res.page_info;

  return {
    data: res.data.map(mapPerformance),
    pageInfo: {
      hasNextPage: has_next_page,
      hasPreviousPage: has_previous_page,
      limit,
      page,
      totalPages: total_pages,
    },
  };
};
