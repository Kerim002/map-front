import { deleteEmployee } from "@/entities/employee/api/mutations/delete.employee";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useDeleteEmployee = () => {
    const queryClient = useQueryClient()
    const { t } = useTranslation()

    return useMutation({
        mutationFn: deleteEmployee,
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