import { apiInstance } from "@/shared/api/interceptor";
import type { User } from "../../model/user";
import type { GetUsersQuery } from "../query-type";
import type { UserDto } from "../dto/user.dto";
import { mapUser } from "../mapper/map-user";

export const getUsers = async (params: GetUsersQuery): Promise<{ data: User[], pageInfo: PageInfo }> => {
    const res = await apiInstance<{ data: UserDto[], page_info: PageInfoDto }>("/user", {
        params
    })

    return {
        data: res.data.map(mapUser),
        pageInfo: {
            hasNextPage: res.page_info.has_next_page,
            hasPreviousPage: res.page_info.has_previous_page,
            limit: res.page_info.limit,
            page: res.page_info.page,
            totalPages: res.page_info.total_pages
        }
    }
}