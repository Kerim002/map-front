import { facilityApi } from "@/entities/facility/api/facility.api";
import useQueryParam from "@/shared/hooks/use-query-param";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { useQuery } from "@tanstack/react-query";

export const FacilityDetailDialog = () => {
  const { getQuery, deleteQuery } = useQueryParam();
  const { data } = useQuery(facilityApi.detail(getQuery("id")));

  console.log(data);
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
