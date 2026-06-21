import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { useTranslation } from "react-i18next";
import { CreateUserForm } from "../form/create-user-form";

export const CreateUserDialog = () => {
  const { t } = useTranslation();
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
        <CreateUserForm />
      </DialogContent>
    </Dialog>
  );
};
