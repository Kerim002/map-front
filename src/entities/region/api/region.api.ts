import { infiniteQueryOptions, keepPreviousData, queryOptions } from "@tanstack/react-query";
import { getRegions } from "./get.regions";
import { getRegionDetails } from "./get.region-details";

export const regionApi = {
  all: () => ["region"],
  listKey: () => [...regionApi.all(), "list"],
  list: (params: PageBaseQuery) => {
    return queryOptions({
      queryKey: [...regionApi.listKey(), params],
      queryFn: () => getRegions(params),
      placeholderData: keepPreviousData,
    });
  },
  detailKey: (id: string) => [...regionApi.all(), "detail", id],
  detail: (id: string) =>
    queryOptions({
      queryKey: regionApi.detailKey(id),
      queryFn: () => getRegionDetails(id),
      enabled: !!id,
    }),

  getRegionInfitityQuery: (params: PageBaseQuery) => {
    return infiniteQueryOptions({
      queryKey: [...regionApi.all(), "list","infinite", params],
      queryFn: ({ pageParam }) => getRegions({ limit: pageParam.limit, page: pageParam.page, search: params.search }),
      initialPageParam: { page: 1, limit: params.limit },
      getNextPageParam: (data, _, { page }) => {
        if (data.pageInfo.hasNextPage) return { limit: params.limit, page: page + 1 }
        return undefined
      },
    })
  }
};
