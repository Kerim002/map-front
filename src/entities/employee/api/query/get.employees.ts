import { apiInstance } from "@/shared/api/interceptor";
import type { EmployeePagination } from "../../model/employee";
import type { EmployeeQuery } from "../query-type/employee-query";
import type { EmployeePaginationDto } from "../dto/employee-dto";
import { mapEmployee } from "../mapper/map-employee";

export const getEmployees = async (params: EmployeeQuery): Promise<EmployeePagination> => {
    const res = await apiInstance<EmployeePaginationDto>(`/employee`, { params })

    return {
        data: res.data.map(mapEmployee),
        pageInfo: {
            hasNextPage: res.page_info.has_next_page,
            hasPreviousPage: res.page_info.has_previous_page,
            limit: res.page_info.limit,
            page: res.page_info.page,
            totalPages: res.page_info.total_pages,
        }
    }
}