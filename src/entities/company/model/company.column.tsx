import type { ColumnDef } from "@tanstack/react-table";
import type { Company } from "./company";
import { CompanyActionCell } from "@/features/company/ui/company-action-cell";

export const companyColumn: ColumnDef<Company>[] = [
  {
    accessorKey: "",
    header: "Number",
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
    header: "Company name",
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
    header: "Company ownership",
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
    header: "Company region",
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
    header: "Action",
    cell: ({ row }) => {
      return <CompanyActionCell id={row.original.id} />;
    },
  },
];
