import { buildingApi } from "@/entities/building/api/building.api";
import { deleteBuilding } from "@/entities/building/api/delete.building";
import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useDeleteBuilding = () => {
  const {t} = useTranslation()
  const all = useMutation({
    mutationFn: deleteBuilding,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: buildingApi.all(),
      });
      toast.success(t("success"))
    },
    onError:()=>{
      toast.error(t("error"))
    }
  });

  return all;
};
