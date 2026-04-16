import { apiInstance } from "@/shared/api/interceptor";
import type { BuildingPagination } from "../model/building";
import type { BuildingPaginationDto } from "./dto/building-dto";
import { mapBuilding } from "./mapper/map-building";

export const getBuildings = async (
  params: PageBaseQuery
): Promise<BuildingPagination> => {
  const res = await apiInstance<BuildingPaginationDto>("/building", {
    params,
  });
  const { has_next_page, has_previous_page, limit, page, total_pages } =
    res.page_info;
  return {
    data: res.data.map(mapBuilding),
    pageInfo: {
      hasNextPage: has_next_page,
      hasPreviousPage: has_previous_page,
      limit,
      page,
      totalPages: total_pages,
    },
  };
};
