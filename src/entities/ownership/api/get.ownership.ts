import { apiInstance } from "@/shared/api/interceptor";
import type { OwnershipPagintion } from "../model/ownership";
import { mapOwnership } from "./mapper/map-ownership";
import type { OwnershipPagintionDto } from "./dto/ownership-dto";

export const getOwnerships = async (
  params: PageBaseQuery
): Promise<OwnershipPagintion> => {
  const res = await apiInstance<OwnershipPagintionDto>(`/ownership/`, {
    params,
  });

  return {
    data: res.data.map(mapOwnership),
    pageInfo: {
      hasNextPage: res.page_info.has_next_page,
      hasPreviousPage: res.page_info.has_previous_page,
      limit: res.page_info.limit,
      page: res.page_info.page,
      totalPages: res.page_info.total_pages,
    },
  };
};
