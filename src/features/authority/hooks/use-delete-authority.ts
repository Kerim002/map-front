import { authorityApi } from "@/entities/authority/api/authority.api";
import { deleteAuthority } from "@/entities/authority/api/delete.authority";
import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";

export const useDeleteAuthority = () => {
  const all = useMutation({
    mutationFn: deleteAuthority,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: authorityApi.all(),
      });
    },
  });

  return all;
};
