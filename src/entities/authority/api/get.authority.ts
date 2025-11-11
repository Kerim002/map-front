import { apiInstance } from "@/shared/api/interceptor";
import type { AuthorityPagionationDto } from "./dto/authority-dto";
import type { AuthorityPagionation } from "../model/authority";
import { mapAuthority } from "./mapper/map-authority";

export const getAuthority = async (
  params: PageBaseQuery
): Promise<AuthorityPagionation> => {
  const res = await apiInstance<AuthorityPagionationDto>(`/authority/`, {
    params,
  });

  const { has_next_page, has_previous_page, limit, page, total_pages } =
    res.page_info;
  return {
    data: res.data.map(mapAuthority),
    pageInfo: {
      hasNextPage: has_next_page,
      hasPreviousPage: has_previous_page,
      limit,
      page,
      totalPages: total_pages,
    },
  };
};
