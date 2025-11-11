import { createPerformance } from "@/entities/performance/api/create.performance";
import { performanceApi } from "@/entities/performance/api/performance.api";
import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";

export const useCreatePerformance = () => {
  const all = useMutation({
    mutationFn: createPerformance,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: performanceApi.all(),
      });
    },
  });

  return all;
};
