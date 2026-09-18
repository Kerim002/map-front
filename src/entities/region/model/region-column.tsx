import type { ColumnDef } from "@tanstack/react-table";
import type { Region } from "./region";

import { RegionActionCell } from "@/features/region/ui/region-action-cell";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { formatToDDMMYYYY } from "@/shared/lib/formatToDDMMYYYY";

export const regionColumn: ColumnDef<Region>[] = [
  {
    accessorKey: "",
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
    accessorKey: "en", // You can keep this or use an ID
    header: () => {
      const { t } = useTranslation();
      return <p>{t("type")}</p>;
    },
    cell: ({ row }) => {
      const { i18n } = useTranslation();

      const currentLang = (i18n.language || "ru") as keyof Pick<Region, "en" | "ru" | "tk">;

      const displayValue = row.original[currentLang] || row.original.ru;
      const navigate = useNavigate();

      return (
        <div>
          <p
            onClick={() => navigate(`/locations/region/${row.original.id}/1`)}
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
      const {t} = useTranslation()
      return (
        <div>
          <p>
            {row.original.updatedAt
              ? formatToDDMMYYYY(row.original.updatedAt)
              : t("not-updated-yet")}
          </p>
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
      return <RegionActionCell id={row.original.id} />;
    },
  },
];
