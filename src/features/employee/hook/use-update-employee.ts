import { updateEmployee } from "@/entities/employee/api/mutations/update.employee"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUpdateEmployee = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["employee"]
            })
        }
    })
}