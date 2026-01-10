import { deleteEmployee } from "@/entities/employee/api/mutations/delete.employee";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteEmployee = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["employee"]
            })
        }
    })
}