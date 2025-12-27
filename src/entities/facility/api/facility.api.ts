import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import type { FacilityQuery } from "./query-type/facility-query";
import { getFacility } from "./query/get-facilities";
import { getDetailFacility } from "./query/get.detail.facility";
import { getFacilityImages } from "./query/get.facility-images";

export const facilityApi = {
  all: ["locations"],
  listKey: (params: FacilityQuery) => [...facilityApi.all, params],
  list: (params: FacilityQuery) =>
    queryOptions({
      queryKey: facilityApi.listKey(params),
      queryFn: () => getFacility(params),
      placeholderData: keepPreviousData,
    }),

  detail: (id: string | undefined) =>
    queryOptions({
      queryKey: [...facilityApi.all, id],
      queryFn: () => getDetailFacility(id as string),
      enabled: !!id,
    }),

  facilityImages:(id:string, enabled:boolean = true) => queryOptions({
    queryKey:["facility-images", id],
    queryFn:() => getFacilityImages(id),
    placeholderData:keepPreviousData,
    enabled:!!id && enabled
  })
};
