import { apiInstance } from "@/shared/api/interceptor";
import type { EmployeCreateMutation } from "../../contract/employee.contract";

export const updateEmployee = async (body: EmployeCreateMutation & { location_id: string, id: string }) => {
    const { id, folder, ...rest } = body

    const res = await apiInstance(`/employee/${id}`, {
        method: "PATCH",
        json: { ...rest, folder_id: folder?.id }
    })

    return res
}