import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { CreateSpecForm } from "../form/create-spec-form";
import { useTranslation } from "react-i18next";

export const CreateSpecDialog = () => {
  const { t } = useTranslation();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{t("create")}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogDescription hidden />
        <DialogTitle hidden />
        <CreateSpecForm />
      </DialogContent>
    </Dialog>
  );
};
