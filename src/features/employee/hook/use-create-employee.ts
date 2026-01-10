import { createEmployee } from "@/entities/employee/api/mutations/create.employee"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateEmployee = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["employee"]
            })
        }
    })
}