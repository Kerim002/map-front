import { ministerApi } from "@/entities/minister/api/minister.api";
import { updateMinister } from "@/entities/minister/api/update.minister";

import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useUpdateMinister = () => {
  const { t } = useTranslation()
  const all = useMutation({
    mutationFn: updateMinister,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ministerApi.all(),
      });
      toast.success(t("success"))
    },
    onError: () => {
      toast.error(t("error"))
    }
  });

  return all;
};
