import { apiInstance } from "@/shared/api/interceptor";
import type { FacilityFolderPagionation } from "../../model/facility-folder";
import type { FacilityFolderQuery } from "../query-type/facility-folder-query";
import type { FacilityFolderPagionationDto } from "../dto/facility-folder-dto";
import { mapFacilityFolder } from "../mapper/map-facility-folder";

export const getFacilityFolders = async (params:FacilityFolderQuery):Promise<FacilityFolderPagionation> => {
    const res = await apiInstance<FacilityFolderPagionationDto>(`/item/${params.location_id}/folder`, {params})

    return {
        data:res.data.map(mapFacilityFolder),
        pageInfo:{
            hasNextPage:res.page_info.has_next_page,
            hasPreviousPage:res.page_info.has_previous_page,
            limit:res.page_info.limit,
            page:res.page_info.page,
            totalPages:res.page_info.total_pages,
        }
    }
}