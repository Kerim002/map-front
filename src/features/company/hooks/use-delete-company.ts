import { companyApi } from "@/entities/company/api/company.api";
import { deleteCompany } from "@/entities/company/api/delete.company";
import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";

export const useDeleteCompany = () => {
  const all = useMutation({
    mutationFn: deleteCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: companyApi.all,
      });
    },
  });
  return all;
};
