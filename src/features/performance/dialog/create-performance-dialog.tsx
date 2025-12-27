import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { CreatePerformanceForm } from "../form/create-performance-form";
import { useTranslation } from "react-i18next";

export const CreatePerformanceDialog = () => {
  const { t } = useTranslation();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{t("create")}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogDescription hidden />
        <DialogTitle hidden />
        <CreatePerformanceForm />
      </DialogContent>
    </Dialog>
  );
};
