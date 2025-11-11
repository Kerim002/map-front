import { regionApi, updateRegion } from "@/entities/region";

import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";

export const useUpdateRegion = () => {
  const all = useMutation({
    mutationFn: updateRegion,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: regionApi.all(),
      });
    },
  });

  return all;
};
