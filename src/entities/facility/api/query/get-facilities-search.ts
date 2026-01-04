import { apiInstance } from "@/shared/api/interceptor";
import type { FacilitySearchQuery } from "../query-type/facility-query";
import type { FacilityDto } from "../dto/facility-dto";
import { mapFacility } from "../mapper/map-facility";
import type { Facility } from "../../model/facility";

export const getFacilitiesSearch = async (params: FacilitySearchQuery): Promise<Facility[]> => {
    const res = await apiInstance<FacilityDto[]>(`/location/search`, {
        params
    })
    return res?.map(mapFacility)
}