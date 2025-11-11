import { regionApi } from "@/entities/region";
import { deleteRegion } from "@/entities/region/api/delete.region";
import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";

export const useDeleteRegion = () => {
  const all = useMutation({
    mutationFn: deleteRegion,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: regionApi.all(),
      });
    },
  });

  return all;
};
