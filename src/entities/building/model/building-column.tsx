import type { ColumnDef } from "@tanstack/react-table";

import type { Building } from "./building";
import { BuildingActionCell } from "@/features/building/ui/building-action-cell";
import { formatToDDMMYYYY } from "@/shared/lib/formatToDDMMYYYY";
import { useTranslation } from "react-i18next";

export const buildingColumn: ColumnDef<Building>[] = [
  {
    id: "number",
    header: () => {
      const { t } = useTranslation();
      return <div>{t("number")}</div>;
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
    accessorKey: "type",
    header: () => {
      const { t } = useTranslation();

      return <p>{t("type")}</p>;
    },
    cell: ({ row }) => {
      return (
        <div>
          <p>{row.original.type}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => {
      const { t } = useTranslation();

      return <p>{t("created-at")}</p>;
    },
    cell: ({ row }) => {
      return (
        <div>
          <p>{formatToDDMMYYYY(row.original.createdAt)}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: () => {
      const { t } = useTranslation();

      return <p>{t("updated-at")}</p>;
    },
    cell: ({ row }) => {
      return (
        <div>
          <p>{row.original.updatedAt || "Not updated yet"}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: () => {
      const { t } = useTranslation();
      return <p>{t("action")}</p>;
    },
    cell: ({ row }) => {
      return <BuildingActionCell id={row.original.id} />;
    },
  },
];
