import { authorityApi } from "@/entities/authority/api/authority.api";
import { updateAuthority } from "@/entities/authority/api/update.authority";

import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useUpdateAuthority = () => {
  const {t} = useTranslation()
  const all = useMutation({
    mutationFn: updateAuthority,
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
