import { updateEmployeeImage } from "@/entities/employee/api/mutations/update,employee.images"
import { useMutation } from "@tanstack/react-query"

export const useUpdateEmployeeImage = () => {
    // const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateEmployeeImage,
        // onSuccess: () => {
        //     queryClient.invalidateQueries({
        //         queryKey: ["employee"]
        //     })
        // }
    })
}