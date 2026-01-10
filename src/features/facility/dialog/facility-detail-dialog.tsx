import useQueryParam from "@/shared/hooks/use-query-param";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";

export const FacilityDetailDialog = () => {
  const { getQuery, deleteQuery } = useQueryParam();

  return (
    <Dialog open={!!getQuery("id")} onOpenChange={() => deleteQuery(["id"])}>
      <DialogContent>
        <DialogHeader className="hidden">
          <DialogTitle />
        </DialogHeader>
        test
      </DialogContent>
    </Dialog>
  );
};
