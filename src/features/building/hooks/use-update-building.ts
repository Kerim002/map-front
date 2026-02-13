import { buildingApi } from "@/entities/building/api/building.api";
import { updateBuilding } from "@/entities/building/api/update.building";
import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useUpdateBuilding = () => {
  const { t } = useTranslation()
  const all = useMutation({
    mutationFn: updateBuilding,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: buildingApi.all(),
      })
      toast.success(t("success"))
    },
    onError:() => {
      toast.error(t("error"))
    }

  });

  return all;
};
