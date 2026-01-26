import type { Folder } from "../../model/facility-folder"
import type { FolderDto } from "../dto/folder-dto"

export const mapFolder = (dto:FolderDto):Folder => {
    return {
        createdAt:dto.created_at,
        id:dto.id,
        isFolder:dto.is_folder,
        locationId:dto.location_id,
        mimeType:dto.mime_type,
        name:dto.name,
        parentPath:dto.parent_path,
        path:dto.path,
        size:dto.size,
        trashed:dto.trashed,
        updatedAt:dto.updated_at,
        url:dto.url
    }
}