import { buildingApi } from "@/entities/building/api/building.api";
import { deleteBuilding } from "@/entities/building/api/delete.building";
import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";

export const useDeleteBuilding = () => {
  const all = useMutation({
    mutationFn: deleteBuilding,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: buildingApi.all(),
      });
    },
  });

  return all;
};
