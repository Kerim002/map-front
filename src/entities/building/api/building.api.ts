import { keepPreviousData, queryOptions } from "@tanstack/react-query";
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
};
