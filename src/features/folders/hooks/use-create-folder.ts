import { createFolder } from "@/entities/folders/api/mutations/create-folder";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useCreateFolder = () => {
  const qc = useQueryClient();
  const { t } = useTranslation()

  return useMutation({
    mutationFn: createFolder,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["folders"] });
      toast.success(t("success"))
    },

    onError: () => {
      toast.error(t("error"))
    }
  });
};
