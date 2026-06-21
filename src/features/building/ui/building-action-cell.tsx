import { Button } from "@/shared/ui/button";
import DeletePopover from "@/shared/ui/delete-popover";
import { Edit, Trash } from "lucide-react";
import { useDeleteBuilding } from "../hooks/use-delete-building";
import useQueryParam from "@/shared/hooks/use-query-param";
import { useProfileQuery } from "@/features/user/hooks/use-profile-query";
import { hasPermission } from "@/shared/lib/has-permission";

type Props = {
  id: string;
};
export const BuildingActionCell = ({ id }: Props) => {
  const { mutate, isPending } = useDeleteBuilding();
  const { setQuery } = useQueryParam();
  const { data } = useProfileQuery()

  return (
    <div>
      <Button
        variant="secondary"
        onClick={() => setQuery([{ key: "id", value: id }])}
        size="sm"
      >
        <Edit className="size-4" />
      </Button>
      {hasPermission(data?.role, "delete:building") &&
        <DeletePopover onDelete={() => mutate(id)}>
          <Button disabled={isPending} variant="destructive" size="sm">
            <Trash className="size-4" />
          </Button>
        </DeletePopover>
      }
    </div>
  );
};
