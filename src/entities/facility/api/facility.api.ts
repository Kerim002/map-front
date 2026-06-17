import { infiniteQueryOptions, keepPreviousData, queryOptions } from "@tanstack/react-query";
import type { FacilityBoundQuery, FacilityQuery, FacilitySearchQuery, FacilityZoomQuery } from "./query-type/facility-query";
import { getFacility } from "./query/get-facilities";
import { getDetailFacility } from "./query/get.detail.facility";
import { getFacilityImages } from "./query/get.facility-images";
import { getFacilitiesSearch } from "./query/get-facilities-search";
import { getFacilitiesByZoom } from "./query/get-facilities-by-zoom";
import { getFacilitesList } from "./query/get-facilities-list";
import { getFacilitiesByBound } from "./query/get-facilities-by-bound";

export const facilityApi = {
  all: ["locations"],
  listKey: (params: FacilityQuery) => [...facilityApi.all, params],
  list: (params: FacilityQuery) =>
    queryOptions({
      queryKey: facilityApi.listKey(params),
      queryFn: () => getFacility(params),
      placeholderData: keepPreviousData,
    }),
  facilityZoom: (params: FacilityZoomQuery) =>
    queryOptions({
      queryKey: [...facilityApi.all, params],
      queryFn: () => getFacilitiesByZoom(params),
      placeholderData: keepPreviousData,
    }),
  facilityBound: (params: FacilityBoundQuery) =>
    queryOptions({
      queryKey: [...facilityApi.all, params],
      queryFn: () => getFacilitiesByBound(params),
      placeholderData: keepPreviousData,
    }),

  detail: (id: string | undefined) =>
    queryOptions({
      queryKey: [...facilityApi.all, id],
      queryFn: () => getDetailFacility(id as string),
      enabled: !!id,
    }),

  facilityImages: (id: string, enabled: boolean = true) => queryOptions({
    queryKey: ["facility-images", id],
    queryFn: () => getFacilityImages(id),
    placeholderData: keepPreviousData,
    enabled: !!id && enabled
  }),
  facilitySearch: (params: FacilitySearchQuery & { enabled: boolean }) => {
    const { enabled, ...rest } = params
    return queryOptions({
      queryKey: ["facility-search", rest],
      queryFn: () => getFacilitiesSearch(rest),
      placeholderData: keepPreviousData,
      enabled: enabled
    })
  },
  facilitySearchInfitityQuery: (params: FacilitySearchQuery & { enabled: boolean }) => {
    const { limit, page, enabled, ...rest } = params
    return infiniteQueryOptions({
      queryKey: [...facilityApi.all, "list", "infinite-search", params],
      queryFn: ({ pageParam }) => getFacilitiesSearch({ limit: pageParam.limit, page: pageParam.page, ...rest }),
      initialPageParam: { page, limit },
      getNextPageParam: (data, _, { page }) => {
        if (data.pageInfo.hasNextPage) return { limit, page: page + 1 }
        return undefined
      },
      enabled: enabled

    })
  },
  facilityList: (params: FacilitySearchQuery & { enabled: boolean }) => {
    const { enabled, ...rest } = params
    return queryOptions({
      queryKey: [...facilityApi.all, "facility-list", rest],
      queryFn: () => getFacilitesList(params),
      placeholderData: keepPreviousData,
      enabled
    })
  }
};
