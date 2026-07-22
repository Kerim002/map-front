import type { Trash } from "../../model/trash";
import type { TrashDto } from "../dto/trash.dto";

export const mapTrash = (dto:TrashDto):Trash => {
    return {
        deletedAt:dto.deleted_at,
        entity:dto.entity,
        expiresAt:dto.expires_at,
        id:dto.id,
        label:dto.label,
        restorable:dto.restorable,
        previewUrl:dto.preview_url
    }
}