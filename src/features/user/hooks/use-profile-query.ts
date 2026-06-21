import { userApi } from "@/entities/user/api/user.api"
import { useQuery } from "@tanstack/react-query"

export const useProfileQuery = () => {
    return useQuery(userApi.getMe())
}
