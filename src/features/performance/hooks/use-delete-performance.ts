import { deletePerformance } from "@/entities/performance/api/delete.performance";
import { performanceApi } from "@/entities/performance/api/performance.api";
import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";

export const useDeletePerformance = () => {
  const all = useMutation({
    mutationFn: deletePerformance,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: performanceApi.all(),
      });
    },
  });

  return all;
};
