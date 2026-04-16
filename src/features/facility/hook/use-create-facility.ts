
import { facilityApi } from "@/entities/facility/api/facility.api";
import { createFacility } from "@/entities/facility/api/mutations/create.facility";
import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useCreateFacility = () => {
  const { t } = useTranslation()
  const all = useMutation({
    mutationFn: createFacility,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: facilityApi.all,
      });
      toast.success(t("success"))
    },
    onError: () => {
      toast.error(t("error"))
    }
  });

  return all;
};
