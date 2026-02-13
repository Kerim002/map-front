import { regionApi, updateRegion } from "@/entities/region";

import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useUpdateRegion = () => {
  const { t } = useTranslation()
  const all = useMutation({
    mutationFn: updateRegion,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: regionApi.all(),
      });
      toast.success(t("success"))
    },
    onError: () => {
      toast.error(t("error"))
    }
  });

  return all;
};
