import { ministerApi } from "@/entities/minister/api/minister.api";
import { createMinister } from "@/entities/minister/api/create.minister";
import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useCreateMinister = () => {
  const { t } = useTranslation()
  const all = useMutation({
    mutationFn: createMinister,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ministerApi.all(),
      });
      toast.success(t("success"))
    },

    onError: () => {
      queryClient.invalidateQueries({
        queryKey: ministerApi.all(),
      });
      toast.error(t("error"))
    }
  });

  return all;
};
