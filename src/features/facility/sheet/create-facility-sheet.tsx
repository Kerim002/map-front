import { Button } from "@/shared/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/shared/ui/sheet";
import { CreateFacilityForm } from "../form/create-facility-form";
import { useTranslation } from "react-i18next";

export const CreateFacilitySheet = () => {
  const {t} = useTranslation()
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>{t("add-facility")}</Button>
      </SheetTrigger>
      <SheetContent
      onPointerDownOutside={e => e.preventDefault()}
      className="p-0 sm:max-w-xl w-full overflow-auto">
        <CreateFacilityForm />
      </SheetContent>
    </Sheet>
  );
};
