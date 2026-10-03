import { Button } from "@/shared/ui/button";
import DeletePopover from "@/shared/ui/delete-popover";
import { Edit, List, Trash } from "lucide-react";
import useQueryParam from "@/shared/hooks/use-query-param";
import { useDeleteRegion } from "../hooks/use-delete-region";
import { useProfileQuery } from "@/features/user/hooks/use-profile-query";
import { hasPermission } from "@/shared/lib/has-permission";
import { useNavigate } from "react-router-dom";

type Props = {
  id: string;
};
export const RegionActionCell = ({ id }: Props) => {
  const { mutate, isPending } = useDeleteRegion();
  const { setQuery } = useQueryParam();
  const { data } = useProfileQuery()
  const navigate = useNavigate()
  return (
    <div>
      <Button
        variant="outline"
        onClick={() => navigate(`/locations/region/${id}/1`)}
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
      {hasPermission(data?.role, "delete:region")

        &&
        <DeletePopover onDelete={() => mutate(id)}>
          <Button disabled={isPending} variant="destructive" size="sm">
            <Trash className="size-4" />
          </Button>
        </DeletePopover>
      }
    </div>
  );
};
