import { apiInstance } from "@/shared/api/interceptor"

export const getCapthca = async (): Promise<{
    captcha_id: string,
    image: string
}> => {
    const res = await apiInstance<{
        captcha_id: string,
        image: string
    }>("/auth/captcha")

    return res
}