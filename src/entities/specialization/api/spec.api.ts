import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { getSpecs } from "./get.spec";
import { getSpecDetails } from "./get.spec-details";

export const specApi = {
  all: () => ["specialization"],
  listKey: () => [...specApi.all(), "list"],
  list: (params: PageBaseQuery) => {
    return queryOptions({
      queryKey: [...specApi.listKey(), params],
      queryFn: () => getSpecs(params),
      placeholderData: keepPreviousData,
    });
  },
  detailKey: (id: string) => [...specApi.all(), "detail", id],
  detail: (id: string) =>
    queryOptions({
      queryKey: specApi.detailKey(id),
      queryFn: () => getSpecDetails(id),
      enabled: !!id,
    }),
};
