import { apiInstance } from "@/shared/api/interceptor"
import type { LocationsByCategory } from "../../model/dashboard"
import type { LocationsByCategoryDto } from "../dto/dashboard.dto"

export const getLocationsByCategory = async ():Promise<LocationsByCategory> => {
    const res = await apiInstance<LocationsByCategoryDto>("/dashboard/locations/by-category")

    return {
        byAuthority:res.data.by_authority,
        byBuilding:res.data.by_building,
        byOwnership:res.data.by_ownership,
        byPerformance:res.data.by_performance,
        byRegion:res.data.by_region
    }
}