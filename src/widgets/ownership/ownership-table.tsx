import { ownershipApi } from "@/entities/ownership/api/ownership.api";
import { ownershipColumn } from "@/entities/ownership/model/ownership-column";
import { CreateOwnershipDialog } from "@/features/ownership/dialog/create-ownership-dialog";
import { EditOwnershipDialog } from "@/features/ownership/dialog/edit-ownership-dialog";
import { useTable } from "@/shared/hooks/use-table";
import { DataTable } from "@/shared/ui/data-table";
import { TablePagination } from "@/shared/ui/table-pagination";
import { useQuery } from "@tanstack/react-query";

export const OwnershipTable = () => {
  const { data, isFetching } = useQuery(
    ownershipApi.list({ limit: 12, page: 1 })
  );

  const { table } = useTable({
    list: data?.data ?? [],
    totalPages: data?.pageInfo.totalPages ?? 0,
    column: ownershipColumn,
    hasNextPage: data?.pageInfo.hasNextPage ?? false,
    hasPrevPage: data?.pageInfo.hasPreviousPage ?? false,
    limit: 12,
  });
  return (
    <div className="w-full p-2 rounded-md  border  overflow-auto scrollbar-thin scrollbar-thumb-neutral-500 scrollbar-track-neutral-200 dark:scrollbar-track-neutral-800">
      <div className="flex justify-end">
        <CreateOwnershipDialog />
      </div>
      <DataTable table={table} />
      <TablePagination table={table} isFetching={isFetching} />
      <EditOwnershipDialog />
    </div>
  );
};
