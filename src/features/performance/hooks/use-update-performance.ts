import { performanceApi } from "@/entities/performance/api/performance.api";
import { updatePerformance } from "@/entities/performance/api/update.performance";

import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useUpdatePerformance = () => {
  const { t } = useTranslation()
  const all = useMutation({
    mutationFn: updatePerformance,
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
