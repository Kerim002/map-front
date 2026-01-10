import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { useTranslation } from "react-i18next";
import { CreateEmployeeForm } from "../form/create-employee-form";

export const CreateEmployeeDialog = () => {
  const { t } = useTranslation();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{t("create")}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogDescription hidden />
        <DialogTitle hidden />
        <CreateEmployeeForm/>
      </DialogContent>
    </Dialog>
  );
};
