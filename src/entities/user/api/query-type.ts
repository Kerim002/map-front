import type { UserRoles } from "@/shared/types/user"

export interface GetUsersQuery extends PageBaseQuery {
    role?:UserRoles,
}   