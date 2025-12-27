import { deleteFacilityImage } from "@/entities/facility/api/mutations/delete.facility-image"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteFacilityImage = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:deleteFacilityImage,
        onSuccess:()=> {
            queryClient.invalidateQueries({
                queryKey:["facility-images"]
            })
        }
    })
}
