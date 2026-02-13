import { deleteOwnership } from "@/entities/ownership/api/delete.ownership";
import { ownershipApi } from "@/entities/ownership/api/ownership.api";
import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useDeleteOwnership = () => {
  const { t } = useTranslation()
  const all = useMutation({
    mutationFn: deleteOwnership,
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
