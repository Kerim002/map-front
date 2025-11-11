import { queryOptions } from "@tanstack/react-query";
import { getPerformance } from "./get.performance";
import { getPerformanceDetail } from "./get.performance.detail";

export const performanceApi = {
  all: () => ["performance"],
  listKey: (params: PageBaseQuery) => [...performanceApi.all(), "list", params],
  list: (params: PageBaseQuery) =>
    queryOptions({
      queryKey: performanceApi.listKey(params),
      queryFn: () => getPerformance(params),
    }),
  detailKey: (id: string) => [...performanceApi.all(), "detail", id],
  detail: (id: string) =>
    queryOptions({
      queryKey: performanceApi.detailKey(id),
      queryFn: () => getPerformanceDetail(id),
      enabled: !!id,
    }),
};
