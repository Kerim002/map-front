import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/shared/ui/sheet";
import useQueryParam from "@/shared/hooks/use-query-param";
import { UpdateFacilityForm } from "../form/update-facility-from";

export const UpdateFacilitySheet = () => {
  const { deleteQuery, getQuery } = useQueryParam();
  return (
    <Sheet
      open={!!getQuery("location-id")}
      onOpenChange={() => deleteQuery(["location-id"])}
    >
      <SheetContent>
        <SheetHeader className="hidden">
          <SheetTitle />
        </SheetHeader>
        <UpdateFacilityForm />
      </SheetContent>
    </Sheet>
  );
};
