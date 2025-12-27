import { apiInstance } from "@/shared/api/interceptor"

export const deleteFacilityImage = async ({facilityId,imageId}:{facilityId:string, imageId:string}) => {
    await apiInstance(`/location/${facilityId}/image/${imageId}`, {
        method:"DELETE"
    })
}