import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { CreateBuildingForm } from "../form/create-building-form";
import { useTranslation } from "react-i18next";

export const CreateBuildingDialog = () => {
  const { t } = useTranslation();
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="mb-2">{t("create")}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogDescription hidden />
        <DialogTitle hidden />
        <CreateBuildingForm />
      </DialogContent>
    </Dialog>
  );
};
