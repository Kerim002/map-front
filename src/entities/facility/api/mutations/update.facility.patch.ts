import { apiInstance } from "@/shared/api/interceptor";
import type { FaciltyMutation } from "../../contract";

export const updateFacilityPatch = async ({ body, id }: { body: Partial<FaciltyMutation>; id: string }) => {

    const json = {
        // "lat": 0,
        // "lng": 0,
        name: body.name,
        address: body.address,
        company_id: body.company?.id,
        building_id: body.building?.id,
        region_id: body.region?.id
    }

    await apiInstance(`/location/${id}`, {
        method: "PATCH",
        json
    })

};