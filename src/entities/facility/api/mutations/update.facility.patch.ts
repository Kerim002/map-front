import { apiInstance } from "@/shared/api/interceptor";
import type { FaciltyMutation } from "../../contract";


export const updateFacilityPatch = async ({ body, id, lat, lng, parent_id, rental }: { body?: Partial<FaciltyMutation>; id: string, lat?: number, lng?: number, rental?: boolean, parent_id?: string }) => {
    const json = {
        lat,
        lng,
        name: body?.name,
        address: body?.address,
        building_id: body?.building?.id,
        region_id: body?.region?.id,
        fire_inspection_at: body?.fireInspectAt ? new Date(body?.fireInspectAt).toISOString() : undefined,
        area: body?.area,
        cadaster: body?.cadaster,
        floor: body?.floor,
        note: body?.note,
        performance_id: body?.performance?.id,
        authority_id: body?.auhtority?.id,
        // ownership_id: body?.ownership?.id,
        parking: body?.parking,
        specialization_id: body?.specialization?.id,
        minister_id: body?.minister?.id,
        license_expired_at: body?.licenseExpiredAt ? new Date(body?.licenseExpiredAt).toISOString() : undefined,
        visibility: body?.visibility,
        rental: rental,
        parent_id,
        city_id: body?.city?.id,
        district_id: body?.district?.id,
        color:body?.color,
        number:body?.number
    }


    await apiInstance(`/location/${id}`, {
        method: "PUT",
        json
    })

};