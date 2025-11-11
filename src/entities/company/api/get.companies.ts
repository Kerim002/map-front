import { apiInstance } from "@/shared/api/interceptor";
import type { CompanyPagination } from "../model/company";
import type { CompanyPaginationDto } from "./dto/company-dto";
import { mapCompany } from "./mapper/map-company";

export const getCompanies = async (
  params: PageBaseQuery
): Promise<CompanyPagination> => {
  const res = await apiInstance<CompanyPaginationDto>(`/company/`, { params });

  return {
    data: res.data.map(mapCompany),
    pageInfo: {
      hasNextPage: res.page_info.has_next_page,
      hasPreviousPage: res.page_info.has_previous_page,
      limit: res.page_info.limit,
      page: res.page_info.page,
      totalPages: res.page_info.total_pages,
    },
  };
};
