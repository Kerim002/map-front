import { apiInstance } from "@/shared/api/interceptor"
import type { Folder } from "../../model/facility-folder"
import type { FolderDto } from "../dto/folder-dto"
import { mapFolder } from "../mapper/map-folder"

export const getFolderById = async (id:string):Promise<Folder> => {
    const res = await apiInstance<FolderDto>(`/item/${id}`)
    return mapFolder(res)
}