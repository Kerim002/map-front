import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { CreateBuildingForm } from "../form/create-building-form";
import { useTranslation } from "react-i18next";

export const CreateBuildingDialog = () => {
  const { t } = useTranslation();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mb-2">{t("create")}</Button>
      </DialogTrigger>
      <DialogContent
      onPointerDownOutside={e => e.preventDefault()}
      className="p-0 overflow-hidden sm:max-w-md">
        <CreateBuildingForm />
      </DialogContent>
    </Dialog>
  );
};
