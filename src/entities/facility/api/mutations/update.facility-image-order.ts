import { apiInstance } from "@/shared/api/interceptor"

type Props = {
    facilityId: string,
    imageId: string,
    order: number
}

export const updateFacilityImageOrder = async ({ facilityId, imageId, order }: Props) => {
    await apiInstance(`/location/${facilityId}/image/${imageId}`, {
        method: "PATCH",
        json: {
            order
        }
    })
}