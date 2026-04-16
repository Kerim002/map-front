import { infiniteQueryOptions, keepPreviousData, queryOptions } from "@tanstack/react-query";
import { getCities } from "./get.city";
import { getCityDetails } from "./get.city-details";

export const cityApi = {
  all: () => ["city"],
  listKey: () => [...cityApi.all(), "list"],
  list: (params: PageBaseQuery) => {
    return queryOptions({
      queryKey: [...cityApi.listKey(), params],
      queryFn: () => getCities(params),
      placeholderData: keepPreviousData,
    });
  },
  detailKey: (id: string) => [...cityApi.all(), "detail", id],
  detail: (id: string) =>
    queryOptions({
      queryKey: cityApi.detailKey(id),
      queryFn: () => getCityDetails(id),
      enabled: !!id,
    }),

  getCityInfitityQuery: (params: PageBaseQuery) => {
    return infiniteQueryOptions({
      queryKey: [...cityApi.all(), "list","infinite", params],
      queryFn: ({ pageParam }) => getCities({ limit: pageParam.limit, page: pageParam.page, search: params.search }),
      initialPageParam: { page: 1, limit: params.limit },
      getNextPageParam: (data, _, { page }) => {
        if (data.pageInfo.hasNextPage) return { limit: params.limit, page: page + 1 }
        return undefined
      },
    })
  }
};
