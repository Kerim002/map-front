import { Button } from "@/shared/ui/button";
import DeletePopover from "@/shared/ui/delete-popover";
import { Edit, Trash } from "lucide-react";
import { useDeleteBuilding } from "../hooks/use-delete-building";
import useQueryParam from "@/shared/hooks/use-query-param";

type Props = {
  id: string;
};
export const BuildingActionCell = ({ id }: Props) => {
  const { mutate, isPending } = useDeleteBuilding();
  const { setQuery } = useQueryParam();
  return (
    <div>
      <Button
        variant="secondary"
        onClick={() => setQuery([{ key: "id", value: id }])}
        size="sm"
      >
        <Edit className="size-4" />
      </Button>
      <DeletePopover onDelete={() => mutate(id)}>
        <Button disabled={isPending} variant="destructive" size="sm">
          <Trash className="size-4" />
        </Button>
      </DeletePopover>
    </div>
  );
};
