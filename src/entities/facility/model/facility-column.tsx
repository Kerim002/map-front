import type { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { formatToDDMMYYYY } from "@/shared/lib/formatToDDMMYYYY";
import type { Facility } from "./facility";
import { Button } from "@/shared/ui/button";
import { Edit, Hash, Loader2, Trash } from "lucide-react";
import DeletePopover from "@/shared/ui/delete-popover";
import { useNavigate } from "react-router-dom";
import useQueryParam from "@/shared/hooks/use-query-param";
import { useDeleteFacility } from "@/features/facility/hook/use-delete-facility";
import { useProfileQuery } from "@/features/user/hooks/use-profile-query";
import { hasPermission } from "@/shared/lib/has-permission";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import { useUpdateFacilityOrder } from "@/features/facility/hook/use-update-facility-order";
import { useState } from "react";

// Factory so callers can drop the order column + reorder button where ordering
// doesn't apply (e.g. the filtered locations view).
export const facilityColumn = ({ withOrder = true, absoluteDetail = false }: { withOrder?: boolean; absoluteDetail?: boolean } = {}): ColumnDef<Facility>[] => [
  {
    id: "number",
    header: () => {
      const { t } = useTranslation();
      return <p>{t("number")}</p>;
    },
    cell: ({ row, table }) => {
      const { pageIndex, pageSize } = table.getState().pagination;
      return (
        <div className="flex items-center gap-3">
          <p className="text-start">{row.index + 1 + pageIndex * pageSize}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: () => {
      const { t } = useTranslation();
      return <p>{t("facility_name")}</p>;
    },
    cell: ({ row }) => {
      const navgate = useNavigate()
      // absoluteDetail: link to the real detail route from contexts where a
      // relative path doesn't resolve (e.g. the filtered locations view).
      // Children live under their parent's /childs route; parents are top-level.
      const to = absoluteDetail
        ? (row.original.parent
            ? `/map/${row.original.parent.id}/childs/1/${row.original.id}`
            : `/map/${row.original.id}`)
        : `${row.original.id}`
      return <p onClick={() => navgate(to)} className="font-medium cursor-pointer">{row.original.name}</p>
    },
  },

  {
    accessorKey: "region",
    header: () => {
      const { t } = useTranslation();
      return <p>{t("region")}</p>;
    },
    cell: ({ row }) => {
      return <p>{row.original.region?.type || "-"}</p>;
    },
  },
  {
    accessorKey: "area",
    header: () => {
      const { t } = useTranslation();
      return <p>{t("area")}</p>;
    },
    cell: ({ row }) => <p>{row.original.area} m²</p>,
  },
  {
    accessorKey: "fireInspectionAt",
    header: () => {
      const { t } = useTranslation();
      return <p>{t("fire_inspection")}</p>;
    },
    cell: ({ row }) => (
      <p>
        {row.original.fireInspectionAt
          ? formatToDDMMYYYY(row.original.fireInspectionAt)
          : "-"}
      </p>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => {
      const { t } = useTranslation();
      return <p>{t("created-at")}</p>;
    },
    cell: ({ row }) => <p>{formatToDDMMYYYY(row.original.createdAt)}</p>,
  },
  {
    accessorKey: "updatedAt",
    header: () => {
      const { t } = useTranslation();
      return <p>{t("updated-at")}</p>;
    },
    cell: ({ row }) => {
      const { t } = useTranslation();
      return (
        <p>
          {row.original.updatedAt
            ? formatToDDMMYYYY(row.original.updatedAt)
            : t("not-updated-yet")}
        </p>
      );
    },
  },
  ...(withOrder
    ? ([{
        accessorKey: "order",
        header: () => {
          const { t } = useTranslation();
          return <p>{t("order")}</p>;
        },
        cell: ({ row }) => {
          return (
            <p>
              {row.original.order}
            </p>
          );
        },
      }] as ColumnDef<Facility>[])
    : []),
  {
    id: "actions",
    header: () => {
      const { t } = useTranslation();
      return <p>{t("action")}</p>;
    },
    cell: ({ row }) => {
      const { setQuery } = useQueryParam()
      const { mutate } = useDeleteFacility()
      const { data } = useProfileQuery()
      const {t} = useTranslation()


        const { mutate: updateOrder, isPending: isUpdating } = useUpdateFacilityOrder();

        // const navigate = useNavigate();

        const [orderValue, setOrderValue] = useState<number | "">(row.original.order ?? 0);
      
        const handleUpdateOrder = () => {
          if (orderValue === ""  || row.original.parent === null) return;
      
          updateOrder({
            parent_id: row.original.parent?.id,
            location_id: row.original.id,
            order: orderValue, // orderValue is guaranteed to be a number here
          });
        };
      return (
        <div>
          {withOrder && (
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
          )}
          <Button
            variant="outline"
            onClick={() => setQuery([{ key: "location-id", value: row.original.id }])}
            size="sm"
          >
            <Edit className="size-4" />
          </Button>
          {
            hasPermission(data?.role, "delete:facility") &&
            <DeletePopover
              onDelete={() => mutate(row.original.id)}

            >
              <Button variant="destructive" size="sm">
                <Trash className="size-4" />
              </Button>
            </DeletePopover>
          }
        </div>
      )
    }

    ,
  },
];