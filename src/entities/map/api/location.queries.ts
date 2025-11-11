import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import type { LocationQuery } from "./query/locations-query";
import { getLocation } from "./get-locations";

export const locationQueries = {
  listKey: (params: LocationQuery) => ["locations", params],
  list: (params: LocationQuery) =>
    queryOptions({
      queryKey: locationQueries.listKey(params),
      queryFn: () => getLocation(params),
      placeholderData: keepPreviousData,
    }),
};
