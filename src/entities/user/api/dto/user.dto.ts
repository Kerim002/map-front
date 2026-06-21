import type { UserRoles } from "@/shared/types/user"

export type UserDto = {
    id: string,
    username: string,
    name: string,
    surname: string,
    phone: string,
    role: UserRoles,
    created_at: string,
    updated_at: string
}