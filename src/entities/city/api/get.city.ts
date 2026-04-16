import { apiInstance } from "@/shared/api/interceptor";
import type { CityPagination } from "../model/city";
import type { CityPaginationDto } from "./dto/city-dto";
import { mapCity } from "./mapper/map-city";

export const getCities = async (
  params: PageBaseQuery
): Promise<CityPagination> => {
  const res = await apiInstance<CityPaginationDto>("/city", { params });

  return {
    list: res.data.map(mapCity) ?? [],
    pageInfo: {
      hasNextPage: res.page_info.has_next_page,
      hasPreviousPage: res.page_info.has_previous_page,
      limit: res.page_info.limit,
      page: res.page_info.page,
      totalPages: res.page_info.total_pages,
    },
  };
};
