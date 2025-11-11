import { authorityApi } from "@/entities/authority/api/authority.api";
import { updateAuthority } from "@/entities/authority/api/update.authority";

import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";

export const useUpdateAuthority = () => {
  const all = useMutation({
    mutationFn: updateAuthority,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: authorityApi.all(),
      });
    },
  });

  return all;
};
