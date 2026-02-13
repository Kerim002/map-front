import { apiInstance } from "@/shared/api/interceptor"


export const facilityDeleteFile= async (id:String) => {

    await apiInstance(`/item/${id}`, {
        method: "DELETE",
    })
}