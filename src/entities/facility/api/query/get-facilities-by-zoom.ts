import { apiInstance } from "@/shared/api/interceptor";
import type { Facility } from "../../model/facility";
import type {  FacilityZoomQuery } from "../query-type/facility-query";
import type { FacilityDto } from "../dto/facility-dto";
import { mapFacility } from "../mapper/map-facility";

export const getFacilitiesByZoom = async (query:FacilityZoomQuery):Promise<Facility[]> => {
    const res = await apiInstance<FacilityDto[]>(`/location/zoom`, {
        params:query
    })


    return res?.map(mapFacility) ?? []
}