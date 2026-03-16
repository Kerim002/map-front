import { keepPreviousData, queryOptions, infiniteQueryOptions } from "@tanstack/react-query";
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
      placeholderData: keepPreviousData
    }),

  getPerformanceInfitityQuery: (params: PageBaseQuery) => {
    return infiniteQueryOptions({
      queryKey: [...performanceApi.all(), "list","infinite", params],
      queryFn: ({ pageParam }) => getPerformance({ limit: pageParam.limit, page: pageParam.page, search: params.search }),
      initialPageParam: { page: 1, limit: params.limit },
      getNextPageParam: (data, _, { page }) => {
        if (data.pageInfo.hasNextPage) return { limit: params.limit, page: page + 1 }
        return undefined
      },
    })
  }
};
