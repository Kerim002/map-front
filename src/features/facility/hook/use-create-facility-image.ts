import { createFacilityImage } from '@/entities/facility/api/mutations/create.facility-image'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateFacilityImage = () => {
        const queryClient = useQueryClient()
    return useMutation({
        mutationFn:createFacilityImage,
                onSuccess:()=> {
            queryClient.invalidateQueries({
                queryKey:["facility-images"]
            })
        }
    })
}
