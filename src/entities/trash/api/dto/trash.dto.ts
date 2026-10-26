import type { UserRoles } from "@/shared/types/user"

export type TrashDto = {
    entity: string,
    id: string,
    label: string,
    deleted_at: string,
    expires_at: string,
    restorable: boolean
    preview_url?: string
    deleted_by?: {
        id: string,
        name: string,
        role: UserRoles
    }

    | null
}