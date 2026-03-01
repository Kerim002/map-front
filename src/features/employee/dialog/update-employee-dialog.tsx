import useQueryParam from "@/shared/hooks/use-query-param";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/shared/ui/dialog";
import { UpdateEmployeeForm } from "../form/update-employee-form";

export const UpdateEmployeeDialog = () => {
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
        <UpdateEmployeeForm/>
      </DialogContent>
    </Dialog>
  );
};
