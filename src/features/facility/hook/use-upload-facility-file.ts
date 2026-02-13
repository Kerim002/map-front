import { facilityUploadFile } from "@/entities/facility/api/mutations/facility-upload-file";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useUploadFacilityFile = () => {
    const queryClient = useQueryClient()
    const { t } = useTranslation()
    const all = useMutation({
        mutationFn: facilityUploadFile,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["facility-folders"]
            }),
            
            toast.success(t("success"))

        },
        onError: () => {
            toast.error(t("error"))
        }

    })

    return all
}