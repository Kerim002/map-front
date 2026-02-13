import { createPerformance } from "@/entities/performance/api/create.performance";
import { performanceApi } from "@/entities/performance/api/performance.api";
import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useCreatePerformance = () => {
  const { t } = useTranslation()
  const all = useMutation({
    mutationFn: createPerformance,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: performanceApi.all(),
      });

      toast.success(t("success"))
    },

    onError: () => {
      toast.error(t("error"))
    }
  });

  return all;
};
