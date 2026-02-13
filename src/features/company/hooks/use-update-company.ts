import { companyApi } from "@/entities/company/api/company.api";
import { updateCompany } from "@/entities/company/api/update.company";
import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useUpdateCompany = () => {
  const { t } = useTranslation()
  const all = useMutation({
    mutationFn: updateCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: companyApi.all,
      });
      toast.success(t("success"))
    },
    onError: () => {
      toast.error(t("error"))
    }
  });

  return all;
};
