import { apiInstance } from "@/shared/api/interceptor";
import type { MinisterPagionationDto } from "./dto/minister-dto";
import type { MinisterPagionation } from "../model/minister";
import { mapMinister } from "./mapper/map-minister";

export const getMinister = async (
  params: PageBaseQuery
): Promise<MinisterPagionation> => {
  const res = await apiInstance<MinisterPagionationDto>(`/ministers`, {
    params,
  });

  const { has_next_page, has_previous_page, limit, page, total_pages } =
    res.page_info;
  return {
    data: res.data.map(mapMinister),
    pageInfo: {
      hasNextPage: has_next_page,
      hasPreviousPage: has_previous_page,
      limit,
      page,
      totalPages: total_pages,
    },
  };
};
