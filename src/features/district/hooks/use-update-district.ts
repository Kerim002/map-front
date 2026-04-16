import { districtApi, updateDistrict } from "@/entities/district";
import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useUpdateDistrict = () => {
  const { t } = useTranslation()
  const all = useMutation({
    mutationFn: updateDistrict,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: districtApi.all(),
      });
      toast.success(t("success"))
    },
    onError: () => {
      toast.error(t("error"))
    }
  });

  return all;
};
