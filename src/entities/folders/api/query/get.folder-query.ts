import { apiInstance } from "@/shared/api/interceptor";
import type { FacilityFolderQuery } from "../query-type/facility-folder-query";
import type { FolderPaginationDto } from "../dto/folder-dto";
import { mapFolder } from "../mapper/map-folder";
import type { FolderPagionation } from "../../model/facility-folder";

export const getFacilityFolders = async (params:FacilityFolderQuery):Promise<FolderPagionation> => {
    const res = await apiInstance<FolderPaginationDto>(`/item/${params.location_id}/folder`, {params})

    return {
        data:res.data.map(mapFolder),
        pageInfo:{
            hasNextPage:res.page_info.has_next_page,
            hasPreviousPage:res.page_info.has_previous_page,
            limit:res.page_info.limit,
            page:res.page_info.page,
            totalPages:res.page_info.total_pages,
        }
    }
}