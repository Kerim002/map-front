import { authorityApi } from "@/entities/authority/api/authority.api";
import { createAuthority } from "@/entities/authority/api/create.authority";
import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useCreateAuthority = () => {
  const { t } = useTranslation()
  const all = useMutation({
    mutationFn: createAuthority,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: authorityApi.all(),
      });
      toast.success(t("success"))
    },

    onError: () => {
      queryClient.invalidateQueries({
        queryKey: authorityApi.all(),
      });
      toast.error(t("error"))
    }
  });

  return all;
};
