import { updateEmployeeOrder } from "@/entities/employee/api/mutations/update-employee-order"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUpdateEmployeeOrder = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateEmployeeOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["employee"]
            })
        }
    })
}