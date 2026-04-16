import { districtApi } from "@/entities/district";
import { deleteDistrict } from "@/entities/district/api/delete.district";
import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useDeleteDistrict = () => {
  const {t} = useTranslation()
  const all = useMutation({
    mutationFn: deleteDistrict,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: districtApi.all(),
      });

      toast.success("success")
    },
        onError: () => {
      toast.error(t("error"))
    }
  });

  return all;
};
