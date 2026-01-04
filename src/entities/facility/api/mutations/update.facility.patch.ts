import { apiInstance } from "@/shared/api/interceptor";
import type { FaciltyMutation } from "../../contract";

export const updateFacilityPatch = async ({ body, id, lat, lng }: { body?: Partial<FaciltyMutation>; id: string, lat?: number, lng?: number }) => {

    const json = {
        lat,
        lng,
        name: body?.name,
        address: body?.address,
        company_id: body?.company?.id,
        building_id: body?.building?.id,
        region_id: body?.region?.id
    }

    await apiInstance(`/location/${id}`, {
        method: "PATCH",
        json
    })

};