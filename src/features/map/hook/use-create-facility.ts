import { createFacility } from "@/entities/map/api/create.facility";
import { locationQueries } from "@/entities/map/api/location.queries";
import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";

export const useCreateFacility = () => {
  const all = useMutation({
    mutationFn: createFacility,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: locationQueries.all,
      });
    },
  });

  return all;
};
