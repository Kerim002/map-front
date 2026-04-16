import { apiInstance } from "@/shared/api/interceptor";
import type { Facility } from "../../model/facility";
import type { FacilityDto } from "../dto/facility-dto";
import { mapFacility } from "../mapper/map-facility";
import type { FacilityBoundQuery } from "../query-type/facility-query";

export const getFacilitiesByBound = async (query:FacilityBoundQuery):Promise<Facility[]> => {
    const res = await apiInstance<FacilityDto[]>(`/location/bound`, {
        params:query
    })


    return res?.map(mapFacility) ?? []
}