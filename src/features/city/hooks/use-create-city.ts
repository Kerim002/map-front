import { cityApi, createCity } from "@/entities/city";
import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useCreateCity = () => {
  const {t} = useTranslation()
  const all = useMutation({
    mutationFn: createCity,
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
