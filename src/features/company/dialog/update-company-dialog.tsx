import useQueryParam from "@/shared/hooks/use-query-param";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/shared/ui/dialog";
import { UpdateCompanyForm } from "../form/update-company-form";

export const UpdateCompanyDialog = () => {
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
        <UpdateCompanyForm />
        {/* <EditBuildingForm /> */}
      </DialogContent>
    </Dialog>
  );
};
