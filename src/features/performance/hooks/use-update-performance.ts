import { performanceApi } from "@/entities/performance/api/performance.api";
import { updatePerformance } from "@/entities/performance/api/update.performance";

import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";

export const useUpdatePerformance = () => {
  const all = useMutation({
    mutationFn: updatePerformance,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: performanceApi.all(),
      });
    },
  });

  return all;
};
