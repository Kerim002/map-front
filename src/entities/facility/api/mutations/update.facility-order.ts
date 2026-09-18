import { apiInstance } from "@/shared/api/interceptor"


type Props = {
    location_id: string,
    order: number,
    parent_id:string
}

export const updateFacilityOrder = async ({ parent_id, location_id, order }: Props) => {
    await apiInstance(`/location/${location_id}/order`, {
        json: {
            parent_id,
            order
        },
        method: "PATCH"

    })
}

