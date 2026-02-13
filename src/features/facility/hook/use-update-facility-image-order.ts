import { updateFacilityImageOrder } from "@/entities/facility/api/mutations/update.facility-image-order"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"

export const useUpdateFacilityImageOrder = () => {
    const queryClient = useQueryClient()
    const { t } = useTranslation()
    return useMutation({
        mutationFn: updateFacilityImageOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["facility-images"]
            })
            toast.success(t("success"))
        },
        onError: () => {
            toast.error(t("error"))
        }
    })
}
