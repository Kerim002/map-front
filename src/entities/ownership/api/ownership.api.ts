import { queryOptions } from "@tanstack/react-query";
import { getOwnerships } from "./get.ownership";
import { getOwnershipDetail } from "./get.ownership.detail";

export const ownershipApi = {
  all: () => ["ownership"],
  listKey: (params: PageBaseQuery) => [...ownershipApi.all(), "list", params],
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
};
