import { buildingApi } from "@/entities/building/api/building.api";
import { createBuilding } from "@/entities/building/api/create.building";
import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";

export const useCreateBuilding = () => {
  const all = useMutation({
    mutationFn: createBuilding,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...buildingApi.all()],
      });
    },
  });

  return all;
};
