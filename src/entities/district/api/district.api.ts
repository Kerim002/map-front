import { infiniteQueryOptions, keepPreviousData, queryOptions } from "@tanstack/react-query";
import { getRegions } from "./get.district";
import { getDistrictDetails } from "./get.district-details";

export const districtApi = {
  all: () => ["district"],
  listKey: () => [...districtApi.all(), "list"],
  list: (params: PageBaseQuery) => {
    return queryOptions({
      queryKey: [...districtApi.listKey(), params],
      queryFn: () => getRegions(params),
      placeholderData: keepPreviousData,
    });
  },
  detailKey: (id: string) => [...districtApi.all(), "detail", id],
  detail: (id: string) =>
    queryOptions({
      queryKey: districtApi.detailKey(id),
      queryFn: () => getDistrictDetails(id),
      enabled: !!id,
    }),

  getDistrictInfitityQuery: (params: PageBaseQuery) => {
    return infiniteQueryOptions({
      queryKey: [...districtApi.all(), "list","infinite", params],
      queryFn: ({ pageParam }) => getRegions({ limit: pageParam.limit, page: pageParam.page, search: params.search }),
      initialPageParam: { page: 1, limit: params.limit },
      getNextPageParam: (data, _, { page }) => {
        if (data.pageInfo.hasNextPage) return { limit: params.limit, page: page + 1 }
        return undefined
      },
    })
  }
};
