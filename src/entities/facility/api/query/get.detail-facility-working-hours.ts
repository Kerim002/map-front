import { apiInstance } from "@/shared/api/interceptor"
import type { WorkingHours } from "../../model/working-hours"
import { mapWorkingHours } from "../mapper/map-working-hours"
import type { WorkingHoursDto } from "../dto/working-hours-dto"

export const getDetailFacilityWorkingHours = async (id:string):Promise<WorkingHours>=> {
    const res = await apiInstance<WorkingHoursDto>(`/location/working-hours/${id}`)

    return mapWorkingHours(res)
}