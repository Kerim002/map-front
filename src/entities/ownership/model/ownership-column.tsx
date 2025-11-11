import type { ColumnDef } from "@tanstack/react-table";
import type { Ownership } from "./ownership";
import { OwnershipActionCell } from "@/features/ownership/ui/performance-action-cell";

export const ownershipColumn: ColumnDef<Ownership>[] = [
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
      return <OwnershipActionCell id={row.original.id} />;
    },
  },
];
