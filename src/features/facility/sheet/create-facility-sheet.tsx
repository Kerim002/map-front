import { Button } from "@/shared/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui/sheet";
import { CreateFacilityForm } from "../form/create-facility-form";

export const CreateFacilitySheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Add facility</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="hidden">
          <SheetTitle />
        </SheetHeader>
        <CreateFacilityForm />
      </SheetContent>
    </Sheet>
  );
};
