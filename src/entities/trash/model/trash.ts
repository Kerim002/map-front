import type { UserRoles } from "@/shared/types/user"

export type Trash = {
    entity: string,
    id: string,
    label: string,
    deletedAt: string,
    expiresAt: string,
    restorable: boolean,
    previewUrl?:string
    deletedBy?: {
            id: string,
            name: string,
            role: UserRoles
        } | null
}