import { createOwnership } from "@/entities/ownership/api/create.ownership";
import { ownershipApi } from "@/entities/ownership/api/ownership.api";
import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useCreateOwnership = () => {
  const { t } = useTranslation()
  const all = useMutation({
    mutationFn: createOwnership,
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
