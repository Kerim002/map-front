import { updateEmployeeImage } from "@/entities/employee/api/mutations/update,employee.images"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"

export const useUpdateEmployeeImage = () => {
    const { t } = useTranslation()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateEmployeeImage,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["employee"]
            })
            queryClient.invalidateQueries({
                queryKey: [variables.id]
            })
            toast.success(t("success"))
        },
        onError: () => {
            toast.error(t("error"))
        }
    })
}