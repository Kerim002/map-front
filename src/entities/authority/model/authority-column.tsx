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
          <p>
            {row.original.updatedAt
              ? formatToDDMMYYYY(row.original.updatedAt)
              : "Not updated yet"}
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
