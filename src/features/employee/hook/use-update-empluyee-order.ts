import { updateEmployeeOrder } from "@/entities/employee/api/mutations/update-employee-order"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"

export const useUpdateEmployeeOrder = () => {
    const { t } = useTranslation()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateEmployeeOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["employee"]
            }),
            toast.success("success")
        },
        onError: () => {
            toast.error(t("error"))
        }
    })
}