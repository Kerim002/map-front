import { infiniteQueryOptions, keepPreviousData, queryOptions } from "@tanstack/react-query";
import { getBuildings } from "./get.buildings";
import { getBuildingDetails } from "./get.building-details";

export const buildingApi = {
  all: () => ["buildings"],
  listKey: (params: PageBaseQuery) => [...buildingApi.all(), "list", params],
  list: (params: PageBaseQuery) => {
    return queryOptions({
      queryKey: buildingApi.listKey(params),
      queryFn: () => getBuildings(params),
      placeholderData: keepPreviousData,
    });
  },
  detail: (id: string) => {
    return queryOptions({
      queryKey: [...buildingApi.all(), id],
      queryFn: () => getBuildingDetails(id),
      enabled: !!id,
    });
  },
    getBuildingInfitityQuery: (params: PageBaseQuery) => {
    return infiniteQueryOptions({
      queryKey: [...buildingApi.all(), "list", "infinite",params],
      queryFn: ({ pageParam }) => getBuildings({ limit: pageParam.limit, page: pageParam.page, search: params.search }),
      initialPageParam: { page: 1, limit: params.limit },
      getNextPageParam: (data, _, { page }) => {
        if (data.pageInfo.hasNextPage) return { limit: params.limit, page: page + 1 }
        return undefined
      },
    })
  }
};
