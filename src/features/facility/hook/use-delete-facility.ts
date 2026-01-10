import { deleteFacility } from "@/entities/facility/api/mutations/delete-facility"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteFacility = () => {
    const queryClient = useQueryClient()
    const all = useMutation({
        mutationFn:deleteFacility,
        onSuccess:() => {
            queryClient.invalidateQueries({
                queryKey:["locations"]
            })
        }
    })

    return all
}