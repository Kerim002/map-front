import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { getDashboardOverview } from "./query/get-dashboard-overview";
import { getDashboardStorage } from "./query/get-dashboard-storage";
import { getLocationsByCategory } from "./query/get-locations-by-category";
import { getLocationsChart } from "./query/get-locations-chart";

export const dashboardApi = {
    all: ["dashboard"],
    getOverview: () => queryOptions({
        queryKey: [dashboardApi.all, "overview"],
        queryFn: () => getDashboardOverview(),
        placeholderData: keepPreviousData
    }),
    getStorage: () => queryOptions({
        queryKey: [dashboardApi.all, "storage"],
        queryFn: () => getDashboardStorage(),
        placeholderData: keepPreviousData
    }),
    getLocationsByCategory: () => queryOptions({
        queryKey: [dashboardApi.all, "category"],
        queryFn: () => getLocationsByCategory(),
        placeholderData: keepPreviousData
    }),
    getLocationsChart: () => queryOptions({
        queryKey: [dashboardApi.all, "locations"],
        queryFn: () => getLocationsChart(),
        placeholderData: keepPreviousData
    }),


}