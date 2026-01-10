import { apiInstance } from "@/shared/api/interceptor"

export const updateEmployeeImage =  async({avatar,id}:{id:string, avatar:File}) => {
    const formData = new FormData()
    formData.append("avatar", avatar)
    await apiInstance(`/employee/avatar/${id}`, {
        method:"PATCH",
        body:formData
    })
}