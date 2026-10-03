import { Button } from "@/shared/ui/button";
import DeletePopover from "@/shared/ui/delete-popover";
import { Edit, List, Trash } from "lucide-react";
import useQueryParam from "@/shared/hooks/use-query-param";
import { useDeleteDistrict } from "../hooks/use-delete-district";
import { hasPermission } from "@/shared/lib/has-permission";
import { useProfileQuery } from "@/features/user/hooks/use-profile-query";
import { useNavigate } from "react-router-dom";

type Props = {
  id: string;
};
export const DistrictActionCell = ({ id }: Props) => {
  const { mutate, isPending } = useDeleteDistrict();
  const { setQuery } = useQueryParam();
  const { data } = useProfileQuery()
  const navigate = useNavigate()
  return (
    <div>
      <Button
        variant="outline"
        onClick={() => navigate(`/locations/district/${id}/1`)}
        size="sm"
        title="Locations"
      >
        <List className="size-4" />
      </Button>
      <Button
        variant="outline"
        onClick={() => setQuery([{ key: "id", value: id }])}
        size="sm"
      >
        <Edit className="size-4" />
      </Button>
      {
        hasPermission(data?.role, "delete:district") &&
        <DeletePopover onDelete={() => mutate(id)}>
          <Button disabled={isPending} variant="destructive" size="sm">
            <Trash className="size-4" />
          </Button>
        </DeletePopover>
      }
    </div>
  );
};
