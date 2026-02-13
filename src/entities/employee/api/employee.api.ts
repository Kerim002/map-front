import { queryOptions } from "@tanstack/react-query";
import type { EmployeeQuery } from "./query-type/employee-query";
import { getEmployees } from "./query/get.employees";
import { getEmployeeDetail } from "./query/get.employee.detail";

export const employeeApi = {
    listKey: ["employee"],
    list: (params: EmployeeQuery) => queryOptions({
        queryFn: () => getEmployees(params),
        queryKey: [...employeeApi.listKey, params]
    }),
    detail: (id?: string) => queryOptions({
        queryFn: () => getEmployeeDetail(id as string),
        queryKey: [...employeeApi.listKey, id],
        enabled:!!id
    })
}