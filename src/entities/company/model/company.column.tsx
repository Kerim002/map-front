import type { ColumnDef } from "@tanstack/react-table";
import type { Company } from "./company";
import { CompanyActionCell } from "@/features/company/ui/company-action-cell";
import { useTranslation } from "react-i18next";

export const companyColumn: ColumnDef<Company>[] = [
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
    accessorKey: "name",
    header: () => {
      const { t } = useTranslation();
      return <p>{t("name")}</p>;
    },
    cell: ({ row }) => {
      return (
        <div>
          <p>{row.original.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "ownership",
    header: () => {
      const { t } = useTranslation();
      return <p>{t("ownership")}</p>;
    },
    cell: ({ row }) => {
      return (
        <div>
          <p>{row.original.ownership.type}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "region",
    header: () => {
      const { t } = useTranslation();
      return <p>{t("region")}</p>;
    },
    cell: ({ row }) => {
      return (
        <div>
          <p>{row.original.region.type}</p>
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
      return <CompanyActionCell id={row.original.id} />;
    },
  },
];
