import { deleteOwnership } from "@/entities/ownership/api/delete.ownership";
import { ownershipApi } from "@/entities/ownership/api/ownership.api";
import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";

export const useDeleteOwnership = () => {
  const all = useMutation({
    mutationFn: deleteOwnership,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ownershipApi.all(),
      });
    },
  });

  return all;
};
