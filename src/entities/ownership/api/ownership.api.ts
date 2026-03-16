import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { getOwnerships } from "./get.ownership";
import { getOwnershipDetail } from "./get.ownership.detail";

export const ownershipApi = {
  all: () => ["ownership"],
  listKey: (params: PageBaseQuery) => [...ownershipApi.all(), "list", params.limit, params],
  list: (params: PageBaseQuery) =>
    queryOptions({
      queryKey: [...ownershipApi.listKey(params)],
      queryFn: () => getOwnerships(params),
    }),

  detailKey: (id: string) => [...ownershipApi.all(), id],
  detail: (id: string) =>
    queryOptions({
      queryKey: ownershipApi.detailKey(id),
      queryFn: () => getOwnershipDetail(id),
      enabled: !!id,
    }),

  getOwnershipInfitityQuery: (params: PageBaseQuery) => {
    return infiniteQueryOptions({
      queryKey: [...ownershipApi.all(), "list", "infinite", params],
      queryFn: ({ pageParam }) => getOwnerships({ limit: pageParam.limit, page: pageParam.page, search: params.search }),
      initialPageParam: { page: 1, limit: params.limit },
      getNextPageParam: (data, _, { page }) => {
        if (data.pageInfo.hasNextPage) return { limit: params.limit, page: page + 1 }
        return undefined
      },
    })
  }
};
