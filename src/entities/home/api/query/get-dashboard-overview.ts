import { apiInstance } from "@/shared/api/interceptor";
import type { DashboardOverview } from "../../model/dashboard";
import type { DashboardOverviewDto } from "../dto/dashboard.dto";

export const getDashboardOverview = async():Promise<DashboardOverview> => {
    const res = await apiInstance<DashboardOverviewDto>("/dashboard/overview")
    console.log(res)
    return {
        totalAreaSqm:res.data.total_area_sqm,
        totalAuthorities:res.data.total_authorities,
        totalBuildings:res.data.total_buildings,
        totalCompanies:res.data.total_companies,
        totalEmployees:res.data.total_employees,
        totalItems:res.data.total_items,
        totalLocations:res.data.total_locations,
        totalOwnerships:res.data.total_ownerships,
        totalPerformances:res.data.total_performances,
        totalRegions:res.data.total_regions
    }
}