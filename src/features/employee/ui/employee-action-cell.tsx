import { useState } from "react";
import { Button } from "@/shared/ui/button";
import DeletePopover from "@/shared/ui/delete-popover";
import { Edit, Trash, Hash, Loader2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

import useQueryParam from "@/shared/hooks/use-query-param";
import { useDeleteEmployee } from "../hook/use-delete-employee";
import { useUpdateEmployeeOrder } from "../hook/use-update-empluyee-order";
import { useTranslation } from "react-i18next";
import { useProfileQuery } from "@/features/user/hooks/use-profile-query";
import { hasPermission } from "@/shared/lib/has-permission";
// import { useNavigate } from "react-router-dom";

type Props = {
  id: string;
  location_id: string;
  currentOrder?: number; // Added to initialize the input
  path?: string
};

export const EmployeeActionCell = ({ id, location_id, currentOrder = 0 }: Props) => {
  const { mutate: deleteEmployee, isPending: isDeleting } = useDeleteEmployee();
  const { mutate: updateOrder, isPending: isUpdating } = useUpdateEmployeeOrder();
  const { data } = useProfileQuery()
  // const navigate = useNavigate();
  const { setQuery } = useQueryParam();
  const { t } = useTranslation()
  const [orderValue, setOrderValue] = useState<number | "">(currentOrder);

  const handleUpdateOrder = () => {
    if (orderValue === "") return;

    updateOrder({
      employee_id: id,
      location_id,
      order: orderValue, // orderValue is guaranteed to be a number here
    });
  };

  return (
    <div className="flex items-center gap-1">

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            <Hash className="size-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-40">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="order">{t("order")}</Label>
              <Input
                id="order"
                type="number"
                value={orderValue}
                onChange={(e) => {
                  const val = e.target.value;
                  setOrderValue(val === "" ? "" : Number(val));
                }}
                className="h-8"
              />
            </div>
            <Button
              size="sm"
              onClick={handleUpdateOrder}
              disabled={isUpdating}
            >
              {isUpdating && <Loader2 className="mr-2 size-3 animate-spin" />}
              {t("update")}
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {/* Edit Button */}
      <Button
        variant="secondary"
        onClick={() => setQuery([{ key: "id", value: id }])}
        size="sm"
      >
        <Edit className="size-4" />
      </Button>

      {hasPermission(data?.role, "delete:employee") &&
        <DeletePopover onDelete={() => deleteEmployee(id)}>
          <Button disabled={isDeleting} variant="destructive" size="sm">
            <Trash className="size-4" />
          </Button>
        </DeletePopover>
      }
    </div>
  );
};