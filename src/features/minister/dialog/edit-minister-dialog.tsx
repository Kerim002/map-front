import useQueryParam from "@/shared/hooks/use-query-param";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/shared/ui/dialog";
import { EditMinisterForm } from "../form/edit-minister-form";

export const EditMinisterDialog = () => {
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
      <DialogContent
        onPointerDownOutside={e => e.preventDefault()}
      >
        <DialogDescription hidden />
        <DialogTitle hidden />
        <EditMinisterForm />
      </DialogContent>
    </Dialog>
  );
};
