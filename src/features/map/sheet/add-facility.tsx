import { Button } from "@/shared/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/shared/ui/sheet";
import { AddFacilityForm } from "../form/add-facility-form";

export const AddFacility = () => {
  return (
    <Sheet open={true}>
      <SheetTrigger>
        <Button>Add facility</Button>
      </SheetTrigger>
      <SheetContent>
        <AddFacilityForm />
      </SheetContent>
    </Sheet>
  );
};
