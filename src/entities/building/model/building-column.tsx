import type { ColumnDef } from "@tanstack/react-table";

import type { Building } from "./building";
import { BuildingActionCell } from "@/features/building/ui/building-action-cell";
import { formatToDDMMYYYY } from "@/shared/lib/formatToDDMMYYYY";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { SortableHeader } from "@/shared/ui/sortable-header";

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
    accessorKey: "type", // You can keep this or use an ID
    header: () => {
      const { t, i18n } = useTranslation();
      const lang = (i18n.language || "ru") as "en" | "ru" | "tk";
      return <SortableHeader label={t("type")} sortKey={`type_${lang}`} />;
    },
    cell: ({ row }) => {
      const { i18n } = useTranslation();

      const currentLang = (i18n.language || "ru") as keyof Pick<Building, "en" | "ru" | "tk">;

      const displayValue = row.original[currentLang] || row.original.ru;
      const navigate = useNavigate();

      return (
        <div>
          <p
            onClick={() => navigate(`/locations/building/${row.original.id}/1`)}
            className="font-medium cursor-pointer hover:text-primary hover:underline"
          >
            {displayValue}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => {
      const { t } = useTranslation();

      return <SortableHeader label={t("created-at")} sortKey="created_at" />;
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

      return <SortableHeader label={t("updated-at")} sortKey="updated_at" />;
    },
    cell: ({ row }) => {
      const {t} = useTranslation()
      return (
        <div>
          <p>{row.original.updatedAt ? formatToDDMMYYYY(row.original.updatedAt) : t("not-updated-yet")}</p>
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
