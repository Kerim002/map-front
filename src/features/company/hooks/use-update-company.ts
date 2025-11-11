import { companyApi } from "@/entities/company/api/company.api";
import { updateCompany } from "@/entities/company/api/update.company";
import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";

export const useUpdateCompany = () => {
  const all = useMutation({
    mutationFn: updateCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: companyApi.all,
      });
    },
  });

  return all;
};
