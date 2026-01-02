import { Button } from "@/shared/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/shared/ui/sheet";
import { CreateFacilityForm } from "../form/create-facility-form";

export const CreateFacilitySheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Add facility</Button>
      </SheetTrigger>
      <SheetContent className="p-0 sm:max-w-md">
        <CreateFacilityForm />
      </SheetContent>
    </Sheet>
  );
};
