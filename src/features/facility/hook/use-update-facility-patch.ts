import { facilityApi } from "@/entities/facility/api/facility.api"
import { updateFacilityPatch } from "@/entities/facility/api/mutations/update.facility.patch"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUpdateFacilityPatch = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateFacilityPatch,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: facilityApi.all,
            });
        },
    })
}