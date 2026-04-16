import { apiInstance } from "@/shared/api/interceptor";
import type { DistrictPagination } from "../model/district";
import type { DistrictPaginationDto } from "./dto/district-dto";
import { mapDistrict } from "./mapper/map-district";

export const getRegions = async (
  params: PageBaseQuery
): Promise<DistrictPagination> => {
  const res = await apiInstance<DistrictPaginationDto>("/district", { params });

  return {
    list: res.data.map(mapDistrict) ?? [],
    pageInfo: {
      hasNextPage: res.page_info.has_next_page,
      hasPreviousPage: res.page_info.has_previous_page,
      limit: res.page_info.limit,
      page: res.page_info.page,
      totalPages: res.page_info.total_pages,
    },
  };
};
