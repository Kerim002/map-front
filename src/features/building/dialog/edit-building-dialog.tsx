import useQueryParam from "@/shared/hooks/use-query-param";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/shared/ui/dialog";
import { EditBuildingForm } from "../form/edit-building-form";

export const EditBuildingDialog = () => {
  const { getQuery, deleteQuery } = useQueryParam();
  return (
    <Dialog
      modal
      open={!!getQuery("id")}
      onOpenChange={(val) => {
        if (!val) {
          deleteQuery(["id"]);
        }
      }}
    >
      <DialogContent>
        <DialogDescription hidden />
        <DialogTitle hidden />
        <EditBuildingForm />
      </DialogContent>
    </Dialog>
  );
};
