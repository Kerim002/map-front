import { apiInstance } from "@/shared/api/interceptor"
import type { User } from "../../model/user"
import type { UserDto } from "../dto/user.dto"
import { mapUser } from "../mapper/map-user"

export const getUserById = async (userId: string): Promise<User> => {
    const res = await apiInstance<UserDto>(`/user/${userId}`)
    return mapUser(res)
}