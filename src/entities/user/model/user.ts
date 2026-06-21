import type { UserRoles } from "@/shared/types/user"

export type User = {
    id: string,
    username: string,
    name: string,
    surname: string,
    phone: string,
    role: UserRoles,
    createdAt: string,
    updatedAt: string
}