import { queryOptions } from "@tanstack/react-query";
import { getCompanies } from "./get.companies";
import { getCompanyDetail } from "./get-company-detail";

export const companyApi = {
  all: ["company"],
  listKey: (params: PageBaseQuery) => [...companyApi.all, params],
  list: (params: PageBaseQuery) =>
    queryOptions({
      queryKey: companyApi.listKey(params),
      queryFn: () => getCompanies(params),
    }),

  detail: (id: string) =>
    queryOptions({
      queryKey: [companyApi.all, id],
      queryFn: () => getCompanyDetail(id),
      enabled: !!id,
    }),
};
