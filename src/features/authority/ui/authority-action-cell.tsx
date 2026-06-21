import { Button } from "@/shared/ui/button";
import DeletePopover from "@/shared/ui/delete-popover";
import { Edit, Trash } from "lucide-react";
import { useDeleteAuthority } from "../hooks/use-delete-authority";
import useQueryParam from "@/shared/hooks/use-query-param";
import { useProfileQuery } from "@/features/user/hooks/use-profile-query";
import { hasPermission } from "@/shared/lib/has-permission";

type Props = {
  id: string;
};
export const AuthorityActionCell = ({ id }: Props) => {
  const { mutate, isPending } = useDeleteAuthority();
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
      {
        hasPermission(data?.role, "delete:authority") &&
        <DeletePopover onDelete={() => mutate(id)}>
          <Button disabled={isPending} variant="destructive" size="sm">
            <Trash className="size-4" />
          </Button>
        </DeletePopover>
      }
    </div>
  );
};
