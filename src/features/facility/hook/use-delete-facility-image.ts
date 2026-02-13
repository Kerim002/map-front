import { deleteFacilityImage } from "@/entities/facility/api/mutations/delete.facility-image"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"

export const useDeleteFacilityImage = () => {
    const { t } = useTranslation()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteFacilityImage,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["facility-images"]
            }),
            toast.success(t("success"))
        },
        onError: () => {
            toast.error(t("error"))
        }
    })
}
