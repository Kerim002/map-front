import { buildingApi } from "@/entities/building/api/building.api";
import { createBuilding } from "@/entities/building/api/create.building";
import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useCreateBuilding = () => {
  const {t} = useTranslation()
  const all = useMutation({
    mutationFn: createBuilding,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...buildingApi.all()],
      });
      toast.success(t("success"))
    },
    onError:() => {
      toast.error(t("error"))
    }

  });

  return all;
};
