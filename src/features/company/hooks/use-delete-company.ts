import { companyApi } from "@/entities/company/api/company.api";
import { deleteCompany } from "@/entities/company/api/delete.company";
import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useDeleteCompany = () => {
  const { t } = useTranslation()
  const all = useMutation({
    mutationFn: deleteCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: companyApi.all,
      });
      toast.success("success")
    },

    onError: () => {
      toast.error(t("error"))
    }
  });
  return all;
};
