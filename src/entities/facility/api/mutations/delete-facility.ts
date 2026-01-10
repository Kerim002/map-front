import { apiInstance } from "@/shared/api/interceptor"

export const deleteFacility = async(id:string) => {
    await apiInstance(`/location/${id}`, {
        method:"DELETE"
    })
}