import { infiniteQueryOptions, keepPreviousData, queryOptions } from "@tanstack/react-query";
import { getMinister } from "./get.minister";
import { getMinisterDetail } from "./get.minister-detail";

export const ministerApi = {
  all: () => ["minister"],
  listKey: (params: PageBaseQuery) => [...ministerApi.all(), "list", params],
  list: (params: PageBaseQuery) => {
    return queryOptions({
      queryKey: ministerApi.listKey(params),
      queryFn: () => getMinister(params),
      placeholderData: keepPreviousData,
    });
  },
  detailKey: (id: string) => [...ministerApi.all(), id],
  detail: (id: string) => {
    return queryOptions({
      queryKey: ministerApi.detailKey(id),
      queryFn: () => getMinisterDetail(id),
      enabled: !!id,
    });
  },
  getMinisterInfitityQuery: (params: PageBaseQuery) => {
    return infiniteQueryOptions({
      queryKey: [...ministerApi.all(), "list", "infinite", params],
      queryFn: ({ pageParam }) => getMinister({ limit: pageParam.limit, page: pageParam.page, search: params.search }),
      initialPageParam: { page: 1, limit: params.limit },
      getNextPageParam: (data, _, { page }) => {
        if (data.pageInfo.hasNextPage) return { limit: params.limit, page: page + 1 }
        return undefined
      },
    })
  }
};
