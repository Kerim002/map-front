import { apiInstance } from "@/shared/api/interceptor"
import type { LocationsByCategory } from "../../model/dashboard"
import type { LocationsByCategoryDto } from "../dto/dashboard.dto"

export const getLocationsByCategory = async ():Promise<LocationsByCategory> => {
    const res = await apiInstance<LocationsByCategoryDto>("/dashboard/locations/by-category")

    return {
        byAuthority:res.by_authority,
        byBuilding:res.by_building,
        byOwnership:res.by_ownership,
        byPerformance:res.by_performance,
        byRegion:res.by_region
    }
}