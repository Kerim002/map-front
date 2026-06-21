import { apiInstance } from "@/shared/api/interceptor"

export const deleteUser = async (userId: string) => {
    await apiInstance(`/user/${userId}`, {
        method:"DELETE"
    })
}