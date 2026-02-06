import type { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { formatToDDMMYYYY } from "@/shared/lib/formatToDDMMYYYY";
import type { Facility } from "./facility";
import { Button } from "@/shared/ui/button";
import { Edit, Trash } from "lucide-react";
import DeletePopover from "@/shared/ui/delete-popover";
import { useNavigate } from "react-router-dom";
import useQueryParam from "@/shared/hooks/use-query-param";
import { useDeleteFacility } from "@/features/facility/hook/use-delete-facility";

export const facilityColumn: ColumnDef<Facility>[] = [
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
      return <p onClick={() => navgate(`${row.original.id}`)} className="font-medium cursor-pointer">{row.original.name}</p>
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
  {
    id: "actions",
    header: () => {
      const { t } = useTranslation();
      return <p>{t("action")}</p>;
    },
    cell: ({ row }) => {
      const {setQuery} = useQueryParam()
      const {mutate} = useDeleteFacility()
      return (
        <div>
          <Button
            variant="secondary"
            onClick={() => setQuery([{ key: "location-id", value: row.original.id }])}
            size="sm"
          >
            <Edit className="size-4" />
          </Button>
          <DeletePopover
              onDelete={() => mutate(row.original.id )}

          >
            <Button variant="destructive" size="sm">
              <Trash className="size-4" />
            </Button>
          </DeletePopover>
        </div>
      )
    }

    ,
  },
];