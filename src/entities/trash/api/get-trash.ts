import { apiInstance } from "@/shared/api/interceptor";
import type { Trash } from "../model/trash";
import type { TrashDto } from "./dto/trash.dto";
import { mapTrash } from "./mapper/map-trash";

export const getTrash = async (params: PageBaseQuery & { entity?: string }): Promise<{ data: Trash[]; pageInfo: PageInfo }> => {
    const { limit, page, entity } = params
    const res = await apiInstance<{ data: TrashDto[], page_info: PageInfoDto }>(`/trash/${entity}`, {
        params: { limit, page }
    })

    return {
        data: res.data.map(mapTrash),
        pageInfo: {
            hasNextPage: res.page_info.has_next_page,
            hasPreviousPage: res.page_info.has_previous_page,
            limit: res.page_info.limit,
            page: res.page_info.page,
            totalPages: res.page_info.total_pages
        }
    }
}