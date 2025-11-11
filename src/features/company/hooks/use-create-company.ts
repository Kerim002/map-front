import { companyApi } from "@/entities/company/api/company.api";
import { createCompany } from "@/entities/company/api/create-company";
import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";

export const useCreateCompany = () => {
  const all = useMutation({
    mutationFn: createCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: companyApi.all,
      });
    },
  });

  return all;
};
