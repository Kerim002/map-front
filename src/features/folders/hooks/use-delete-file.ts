import { facilityDeleteFile } from "@/entities/folders/api/mutations/delete-file"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useDeleteFile = () => {
    const qc = useQueryClient();
    const { t } = useTranslation()
    return useMutation({
        mutationFn: facilityDeleteFile,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["folders"] });
            toast.success(t("success"))
        },

        onError: () => {
            toast.error(t("error"))
        }
    })
}