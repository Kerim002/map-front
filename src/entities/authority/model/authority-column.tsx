import type { ColumnDef } from "@tanstack/react-table";

import type { Authority } from "./authority";
import { AuthorityActionCell } from "@/features/authority/ui/authority-action-cell";
import { useTranslation } from "react-i18next";
import { formatToDDMMYYYY } from "@/shared/lib/formatToDDMMYYYY";

export const authorityColumn: ColumnDef<Authority>[] = [
  {
    accessorKey: "",
    id: "index",
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
    accessorKey: "type", // You can keep this or use an ID
    header: () => {
      const { t } = useTranslation();
      return <p>{t("type")}</p>;
    },
    cell: ({ row }) => {
      const { i18n } = useTranslation();

      const currentLang = (i18n.language || "ru") as keyof Pick<Authority, "en" | "ru" | "tk">;

      const displayValue = row.original[currentLang] || row.original.ru;

      return (
        <div>
          <p className="font-medium">{displayValue}</p>
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
      return <AuthorityActionCell id={row.original.id} />;
    },
  },
];
