
import { facilityApi } from "@/entities/facility/api/facility.api";
import { createFacility } from "@/entities/facility/api/mutations/create.facility";
import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";

export const useCreateFacility = () => {
  const all = useMutation({
    mutationFn: createFacility,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: facilityApi.all,
      });
    },
  });

  return all;
};


// unas 1 20
// tftel 2 25
// plemnt 1 25
// okroska 1 20
