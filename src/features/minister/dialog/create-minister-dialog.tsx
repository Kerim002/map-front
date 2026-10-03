import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { CreateMinisterForm } from "../form/create-minister-form";
import { useTranslation } from "react-i18next";

export const CreateMinisterDialog = () => {
  const { t } = useTranslation()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{t("create")}</Button>
      </DialogTrigger>
      <DialogContent
        onPointerDownOutside={e => e.preventDefault()}
      >
        <DialogDescription hidden />
        <DialogTitle hidden />
        <CreateMinisterForm />
      </DialogContent>
    </Dialog>
  );
};
