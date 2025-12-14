import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import type { LocationQuery } from "./query/locations-query";
import { getLocation } from "./get-locations";
import { getDetailFacility } from "./get.detail.facility";

export const locationQueries = {
  all: ["locations"],
  listKey: (params: LocationQuery) => [...locationQueries.all, params],
  list: (params: LocationQuery) =>
    queryOptions({
      queryKey: locationQueries.listKey(params),
      queryFn: () => getLocation(params),
      placeholderData: keepPreviousData,
    }),

  detail: (id: string | undefined) =>
    queryOptions({
      queryKey: [...locationQueries.all, id],
      queryFn: () => getDetailFacility(id as string),
      enabled: !!id,
    }),
};
