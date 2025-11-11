import { Button } from "@/shared/ui/button";
import DeletePopover from "@/shared/ui/delete-popover";
import { Edit, Trash } from "lucide-react";
import useQueryParam from "@/shared/hooks/use-query-param";
import { useDeleteCompany } from "../hooks/use-delete-company";

type Props = {
  id: string;
};
export const CompanyActionCell = ({ id }: Props) => {
  const { mutate, isPending } = useDeleteCompany();
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
