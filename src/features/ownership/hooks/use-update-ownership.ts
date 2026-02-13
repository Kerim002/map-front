import { ownershipApi } from "@/entities/ownership/api/ownership.api";
import { updateOwnership } from "@/entities/ownership/api/update.ownership";

import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useUpdateOwnership = () => {
  const { t } = useTranslation()
  const all = useMutation({
    mutationFn: updateOwnership,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ownershipApi.all(),
      });
      toast.success(t("success"))
    },

    onError: () => {
      toast.error(t("error"))
    }
  });

  return all;
};
