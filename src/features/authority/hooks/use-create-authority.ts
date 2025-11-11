import { authorityApi } from "@/entities/authority/api/authority.api";
import { createAuthority } from "@/entities/authority/api/create.authority";
import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";

export const useCreateAuthority = () => {
  const all = useMutation({
    mutationFn: createAuthority,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: authorityApi.all(),
      });
    },
  });

  return all;
};
