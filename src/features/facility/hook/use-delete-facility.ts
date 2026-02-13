import { deleteFacility } from "@/entities/facility/api/mutations/delete-facility"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"

export const useDeleteFacility = () => {
    const { t } = useTranslation()
    const queryClient = useQueryClient()
    const all = useMutation({
        mutationFn: deleteFacility,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["locations"]
            })
            toast.success("success")
        },
        onError: () => {
            toast.error(t("error"))
        }
    })

    return all
}