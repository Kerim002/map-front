import { createRegion, regionApi } from "@/entities/region";
import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";

export const useCreateRegion = () => {
  const all = useMutation({
    mutationFn: createRegion,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: regionApi.all(),
      });
    },
  });

  return all;
};
