import { specApi } from "@/entities/specialization/api";
import { deleteSpec } from "@/entities/specialization/api/delete.spec";
import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useDeleteSpec = () => {
  const {t} = useTranslation()
  const all = useMutation({
    mutationFn: deleteSpec,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: specApi.all(),
      });

      toast.success("success")
    },
        onError: () => {
      toast.error(t("error"))
    }
  });

  return all;
};
