import type { ColumnDef } from "@tanstack/react-table";
import type { Region } from "./region";

import { RegionActionCell } from "@/features/region/ui/region-action-cell";

export const regionColumn: ColumnDef<Region>[] = [
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
    accessorKey: "type",
    header: "Type",
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
    header: "Created at",
    cell: ({ row }) => {
      return (
        <div>
          <p>{row.original.createdAt}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated at",
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
    header: "Action",
    cell: ({ row }) => {
      return <RegionActionCell id={row.original.id} />;
    },
  },
];
