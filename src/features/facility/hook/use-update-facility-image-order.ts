import { updateFacilityImageOrder } from "@/entities/facility/api/mutations/update.facility-image-order"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUpdateFacilityImageOrder = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateFacilityImageOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["facility-images"]
            })
        }
    })
}
