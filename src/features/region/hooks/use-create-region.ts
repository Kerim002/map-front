import { createRegion, regionApi } from "@/entities/region";
import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useCreateRegion = () => {
  const {t} = useTranslation()
  const all = useMutation({
    mutationFn: createRegion,
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
