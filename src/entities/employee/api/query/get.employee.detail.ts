import { apiInstance } from "@/shared/api/interceptor"
import type { Employee } from "../../model/employee"
import { mapEmployee } from "../mapper/map-employee"
import type { EmployeeDto } from "../dto/employee-dto"

export const getEmployeeDetail = async (id: string): Promise<Employee> => {
    const res = await apiInstance<EmployeeDto>(`/employee/${id}`)
    return mapEmployee(res)
}