import { apiInstance } from "@/shared/api/interceptor";
import type { FaciltyMutation } from "../../contract";


export const updateFacilityPatch = async ({ body, id, lat, lng }: { body?: Partial<FaciltyMutation>; id: string, lat?: number, lng?: number }) => {

    const json = {
        lat,
        lng,
        name: body?.name,
        address: body?.address,
        building_id: body?.building?.id,
        region_id: body?.region?.id,
        fire_inspect_at: body?.fireInspectAt ? new Date(body?.fireInspectAt).toISOString() : undefined,
        area: body?.area,
        cadaster: body?.cadaster,
        floor: body?.floor,
        note: body?.note,
        performance_id: body?.performance?.id,
        authority_id: body?.auhtority?.id,
        ownership_id: body?.ownership?.id,
        parking: body?.parking,
    }

    await apiInstance(`/location/${id}`, {
        method: "PATCH",
        json
    })

};