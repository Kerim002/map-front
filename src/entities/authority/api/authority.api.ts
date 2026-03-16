
import { infiniteQueryOptions, keepPreviousData, queryOptions } from "@tanstack/react-query";
import { getAuthority } from "./get.authority";
import { getAuthorityDetail } from "./get.authority-detail";

export const authorityApi = {
  all: () => ["authority"],
  listKey: (params: PageBaseQuery) => [...authorityApi.all(), "list", params],
  list: (params: PageBaseQuery) => {
    return queryOptions({
      queryKey: authorityApi.listKey(params),
      queryFn: () => getAuthority(params),
      placeholderData: keepPreviousData,
    });
  },
  detailKey: (id: string) => [...authorityApi.all(), id],
  detail: (id: string) => {
    return queryOptions({
      queryKey: authorityApi.detailKey(id),
      queryFn: () => getAuthorityDetail(id),
      enabled: !!id,
    });
  },
    getAuthorityInfitityQuery: (params: PageBaseQuery) => {
    return infiniteQueryOptions({
      queryKey: [...authorityApi.all(), "list","infinite",  params],
      queryFn: ({ pageParam }) => getAuthority({ limit: pageParam.limit, page: pageParam.page, search: params.search }),
      initialPageParam: { page: 1, limit: params.limit },
      getNextPageParam: (data, _, { page }) => {
        if (data.pageInfo.hasNextPage) return { limit: params.limit, page: page + 1 }
        return undefined
      },
    })
  }
};
