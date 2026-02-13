import { apiInstance } from "@/shared/api/interceptor"
import type { DashboardLocationsChartDto } from "../dto/dashboard.dto"

export const getLocationsChart = async (): Promise<DashboardLocationsChartDto> => {
    const res = await apiInstance<DashboardLocationsChartDto>("/dashboard/locations/chart")

    return res
}