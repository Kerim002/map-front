import { createEmployee } from "@/entities/employee/api/mutations/create.employee"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"

export const useCreateEmployee = () => {
    const { t } = useTranslation()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["employee"]
            }),
                toast.success(t("success"))
        },
        onError: () => {
            toast.error(t("error"))
        }
    })
}