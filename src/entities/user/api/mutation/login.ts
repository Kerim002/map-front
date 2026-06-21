import { apiInstance } from "@/shared/api/interceptor"
import type { User } from "../../model/user"
import type { UserDto } from "../dto/user.dto"
import { mapUser } from "../mapper/map-user"

export const login = async (json: { login: string, password: string }): Promise<{ user: User, token: string }> => {
    const res = await apiInstance<{ user: UserDto, token: string }>("/auth/login", {
        method: "POST",
        json,
    })

    return {
        token: res.token,
        user: mapUser(res.user),
    }
}