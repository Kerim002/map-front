import { apiInstance } from "@/shared/api/interceptor";
import type { RegionPagination } from "../model/region";
import type { RegionPaginationDto } from "./dto/region-dto";
import { mapRegion } from "./mapper/map-region";

export const getRegions = async (
  params: PageBaseQuery
): Promise<RegionPagination> => {
  const res = await apiInstance<RegionPaginationDto>("/region/", { params });

  return {
    list: res.data.map(mapRegion) ?? [],
    pageInfo: {
      hasNextPage: res.page_info.has_next_page,
      hasPreviousPage: res.page_info.has_previous_page,
      limit: res.page_info.limit,
      page: res.page_info.page,
      totalPages: res.page_info.total_pages,
    },
  };
};
