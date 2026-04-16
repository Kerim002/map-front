import { cityApi } from "@/entities/city";
import { deleteCity } from "@/entities/city/api/delete.city";
import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useDeleteCity = () => {
  const {t} = useTranslation()
  const all = useMutation({
    mutationFn: deleteCity,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: cityApi.all(),
      });
      toast.success("success")
    },
        onError: () => {
      toast.error(t("error"))
    }
  });

  return all;
};
