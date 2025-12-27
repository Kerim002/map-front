import { apiInstance } from "@/shared/api/interceptor";
import type { WorkingHours } from "../../model/working-hours";
import type { WorkingHoursDto } from "../dto/working-hours-dto";
import { mapWorkingHours } from "../mapper/map-working-hours";

export const getFacilityWorkingHours = async (facilityId:string):Promise<WorkingHours[]>  => {
    const res = await apiInstance<WorkingHoursDto[]>(`/location/${facilityId}/working-hours`)

    return res.length ? res.map(mapWorkingHours) : []
}