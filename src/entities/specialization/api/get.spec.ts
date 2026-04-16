import { apiInstance } from "@/shared/api/interceptor";
import type { SpecPagination } from "../model/spec";
import type { SpecPaginationDto } from "./dto/spec-dto";
import { mapSpec } from "./mapper/map-spec";

export const getSpecs = async (
  params: PageBaseQuery
): Promise<SpecPagination> => {
  const res = await apiInstance<SpecPaginationDto>("/specialization", { params });

  return {
    list: res.data.map(mapSpec) ?? [],
    pageInfo: {
      hasNextPage: res.page_info.has_next_page,
      hasPreviousPage: res.page_info.has_previous_page,
      limit: res.page_info.limit,
      page: res.page_info.page,
      totalPages: res.page_info.total_pages,
    },
  };
};
