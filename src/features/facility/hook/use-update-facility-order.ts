
import { facilityApi } from "@/entities/facility/api/facility.api"
import { updateFacilityOrder } from "@/entities/facility/api/mutations/update.facility-order"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"

export const useUpdateFacilityOrder = () => {
    const queryClient = useQueryClient()
    const { t } = useTranslation()
    return useMutation({
        mutationFn: updateFacilityOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: facilityApi.all,

            });

            toast.success(t("success"))
        },
        onError: () => {
            toast.error(t("error"))
        }
    })
}