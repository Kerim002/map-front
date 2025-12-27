import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { CreateCompanyForm } from "../form/create-company-form";
import { useTranslation } from "react-i18next";

export const CreateCompanyDialog = () => {
  const { t } = useTranslation();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{t("create")}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogDescription hidden />
        <DialogTitle hidden />
        <CreateCompanyForm />
      </DialogContent>
    </Dialog>
  );
};
