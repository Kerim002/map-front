import { cityApi, updateCity } from "@/entities/city";
import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useUpdateCity = () => {
  const { t } = useTranslation()
  const all = useMutation({
    mutationFn: updateCity,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: cityApi.all(),
      });
      toast.success(t("success"))
    },
    onError: () => {
      toast.error(t("error"))
    }
  });

  return all;
};
