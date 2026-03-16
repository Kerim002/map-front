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
      <SheetContent
      
      onPointerDownOutside={e => e.preventDefault()}
      className="p-0 sm:max-w-xl  overflow-auto">
        <SheetHeader className="hidden">
          <SheetTitle />
        </SheetHeader>
        <UpdateFacilityForm />
      </SheetContent>
    </Sheet>
  );
};
