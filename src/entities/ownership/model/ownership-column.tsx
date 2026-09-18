import type { ColumnDef } from "@tanstack/react-table";
import type { Ownership } from "./ownership";
import { OwnershipActionCell } from "@/features/ownership/ui/performance-action-cell";
import { useTranslation } from "react-i18next";
import { formatToDDMMYYYY } from "@/shared/lib/formatToDDMMYYYY";
import { useNavigate } from "react-router-dom";

export const ownershipColumn: ColumnDef<Ownership>[] = [
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

      const currentLang = (i18n.language || "ru") as keyof Pick<Ownership, "en" | "ru" | "tk">;

      const displayValue = row.original[currentLang] || row.original.ru;
      const navigate = useNavigate();

      return (
        <div>
          <p
            onClick={() => navigate(`/locations/ownership/${row.original.id}/1`)}
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
      return <OwnershipActionCell id={row.original.id} />;
    },
  },
];
