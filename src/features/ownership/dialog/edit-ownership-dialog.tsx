import useQueryParam from "@/shared/hooks/use-query-param";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/shared/ui/dialog";
import { EditOwnershipForm } from "../form/edit-ownership-form";

export const EditOwnershipDialog = () => {
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
        <EditOwnershipForm />
      </DialogContent>
    </Dialog>
  );
};
