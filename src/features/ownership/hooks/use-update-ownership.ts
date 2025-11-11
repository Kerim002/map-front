import { ownershipApi } from "@/entities/ownership/api/ownership.api";
import { updateOwnership } from "@/entities/ownership/api/update.ownership";

import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";

export const useUpdateOwnership = () => {
  const all = useMutation({
    mutationFn: updateOwnership,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ownershipApi.all(),
      });
    },
  });

  return all;
};
