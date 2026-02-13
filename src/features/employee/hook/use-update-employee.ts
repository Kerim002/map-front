import { updateEmployee } from "@/entities/employee/api/mutations/update.employee"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"

export const useUpdateEmployee = () => {
    const { t } = useTranslation()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateEmployee,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["employee"]
            }),
            queryClient.invalidateQueries({
                queryKey: [variables.id]
            }),
            toast.success(t("success"))
        },
        onError: () => {
            toast.error(t("error"))
        }
    })
}