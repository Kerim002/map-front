import { createOwnership } from "@/entities/ownership/api/create.ownership";
import { ownershipApi } from "@/entities/ownership/api/ownership.api";
import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";

export const useCreateOwnership = () => {
  const all = useMutation({
    mutationFn: createOwnership,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ownershipApi.all(),
      });
    },
  });

  return all;
};
