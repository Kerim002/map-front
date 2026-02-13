import { apiInstance } from "@/shared/api/interceptor";
import type { DashboardOverview } from "../../model/dashboard";
import type { DashboardOverviewDto } from "../dto/dashboard.dto";

export const getDashboardOverview = async():Promise<DashboardOverview> => {
    const res = await apiInstance<DashboardOverviewDto>("/dashboard/overview")

    return {
        totalAreaSqm:res.total_area_sqm,
        totalAuthorities:res.total_authorities,
        totalBuildings:res.total_buildings,
        totalCompanies:res.total_companies,
        totalEmployees:res.total_employees,
        totalItems:res.total_items,
        totalLocations:res.total_locations,
        totalOwnerships:res.total_ownerships,
        totalPerformances:res.total_performances,
        totalRegions:res.total_regions
    }
}