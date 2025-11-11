import useQueryParam from "@/shared/hooks/use-query-param";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/shared/ui/dialog";
import { EditPerformanceForm } from "../form/edit-performance-form";

export const EditPerformanceDialog = () => {
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
        <EditPerformanceForm />
      </DialogContent>
    </Dialog>
  );
};
