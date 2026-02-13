import { regionApi } from "@/entities/region";
import { deleteRegion } from "@/entities/region/api/delete.region";
import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useDeleteRegion = () => {
  const {t} = useTranslation()
  const all = useMutation({
    mutationFn: deleteRegion,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: regionApi.all(),
      });

      toast.success("success")
    },
        onError: () => {
      toast.error(t("error"))
    }
  });

  return all;
};
