import { authorityApi } from "@/entities/authority/api/authority.api";
import { deleteAuthority } from "@/entities/authority/api/delete.authority";
import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useDeleteAuthority = () => {
  const {t} = useTranslation()
  const all = useMutation({
    mutationFn: deleteAuthority,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: authorityApi.all(),
      });
      toast.success(t("success"))
    },

    onError:() => {
       toast.error(t("error"))
    }
  });

  return all;
};
