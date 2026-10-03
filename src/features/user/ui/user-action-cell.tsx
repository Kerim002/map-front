import { Button } from "@/shared/ui/button";
import { Edit, Trash } from "lucide-react";
import useQueryParam from "@/shared/hooks/use-query-param";
import { useDeleteUser } from "../hooks/use-delete-user";
import DeletePopover from "@/shared/ui/delete-popover";
import { useProfileQuery } from "../hooks/use-profile-query";
import type { UserRoles } from "@/shared/types/user";

type Props = {
  id: string;
  userRole: UserRoles
};
export const UserActionCell = ({ id, userRole }: Props) => {
  const { isPending, mutate } = useDeleteUser()
  const { setQuery } = useQueryParam();
  const { data } = useProfileQuery()
  console.log(data)
  console.log(userRole)

  if (data?.role === "superadmin") {
    return (
      <div>
        <Button
          variant="outline"
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
  } else if (data?.role === "admin" &&( userRole === "superadmin" || userRole === "admin")) {
    return null
  } else {
    return (

      <div>
        <Button
          variant="outline"
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
    )
  }
};
