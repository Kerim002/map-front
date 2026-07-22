import { apiInstance } from "@/shared/api/interceptor"

export const restoreTrashItem =  async({entity,id}:{entity:string, id:string}) => {
    await apiInstance(`/trash/${entity}/${id}/restore`, {
        method:"POST"
    })
}