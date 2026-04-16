import type { FacilityImage } from "../../model/facility-image";
import type { FacilityImageDto } from "../dto/facility-image-dto";

export const mapFacilityImage = (dto:FacilityImageDto) :FacilityImage => {

    return {
        createdAt:dto.created_at,
        id:dto.id,
        path:dto.bucket_name,
        order:dto.order,
        url:dto.url

    }
}