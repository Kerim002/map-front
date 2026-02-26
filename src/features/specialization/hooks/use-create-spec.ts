import { createSpec, specApi } from "@/entities/specialization/api";
import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useCreateSpec = () => {
  const {t} = useTranslation()
  const all = useMutation({
    mutationFn: createSpec,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: specApi.all(),
      });

      toast.success(t("success"))
    },
        onError: () => {
      toast.error(t("error"))
    }
    
  });

  return all;
};
