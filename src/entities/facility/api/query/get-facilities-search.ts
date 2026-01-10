import { apiInstance } from "@/shared/api/interceptor";
import type { FacilitySearchQuery } from "../query-type/facility-query";
import type {  FacilityPagionationDto } from "../dto/facility-dto";
import { mapFacility } from "../mapper/map-facility";
import type {  FacilityPagionation } from "../../model/facility";

export const getFacilitiesSearch = async (params: FacilitySearchQuery): Promise<FacilityPagionation> => {
    const res = await apiInstance<FacilityPagionationDto>(`/location/search`, {
        params
    })
    return {
        data: res.data.map(mapFacility),
        pageInfo: {
            hasNextPage: res.page_info.has_next_page,
            limit: res.page_info.limit,
            page: res.page_info.page,
            hasPreviousPage: res.page_info.has_previous_page,
            totalPages: res.page_info.total_pages,
        }
    }
}