import { facilityApi } from "@/entities/facility/api/facility.api"
import { updateFacilityPatch } from "@/entities/facility/api/mutations/update.facility.patch"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"

export const useUpdateFacilityPatch = () => {
    const queryClient = useQueryClient()
    const { t } = useTranslation()
    return useMutation({
        mutationFn: updateFacilityPatch,
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