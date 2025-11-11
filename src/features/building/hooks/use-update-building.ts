import { buildingApi } from "@/entities/building/api/building.api";
import { updateBuilding } from "@/entities/building/api/update.building";
import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";

export const useUpdateBuilding = () => {
  const all = useMutation({
    mutationFn: updateBuilding,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: buildingApi.all(),
      }),
  });

  return all;
};
