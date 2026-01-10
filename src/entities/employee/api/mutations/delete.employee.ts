import { apiInstance } from "@/shared/api/interceptor"

export const deleteEmployee = async (id:string) => {
    await apiInstance(`/employee/${id}`, {
        method:"DELETE"
    })
}