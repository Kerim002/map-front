import { apiInstance } from "@/shared/api/interceptor";
import type { FacilityImage } from "../../model/facility-image";
import type { FacilityImageDto } from "../dto/facility-image-dto";
import { mapFacilityImage } from "../mapper/map-facility-image";

export const getFacilityImages = async (id:string):Promise<FacilityImage[]> => {

    const res = await apiInstance<{data:FacilityImageDto[]}>(`/location/${id}/images`)

    return res.data.map(mapFacilityImage).sort((a,b) => a.order - b.order)


}