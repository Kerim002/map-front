import { facilityUploadFile } from "@/entities/folders/api/mutations/create-file";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useCreateFile = () => {
    const queryClient = useQueryClient()
    const { t } = useTranslation()
    const all = useMutation({
        mutationFn: facilityUploadFile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["folders"] });
            toast.success(t("success"))

        },
        onError: () => {
            toast.error(t("error"))
        }

    })

    return all
}