import { ministerApi } from "@/entities/minister/api/minister.api";
import { ministerColumn } from "@/entities/minister/model/minister-column";
import { CreateMinisterDialog } from "@/features/minister/dialog/create-minister-dialog";
import { EditMinisterDialog } from "@/features/minister/dialog/edit-minister-dialog";
import { useTable } from "@/shared/hooks/use-table";
import { DataTable } from "@/shared/ui/data-table";
import { TablePagination } from "@/shared/ui/table-pagination";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const MinisterTable = () => {
  const { currentPage } = useParams()
  const { data, isFetching } = useQuery(
    ministerApi.list({ limit: 12, page: Number(currentPage) ?? 1 })
  );

  const { table } = useTable({
    list: data?.data ?? [],
    totalPages: data?.pageInfo.totalPages ?? 0,
    column: ministerColumn,
    hasNextPage: data?.pageInfo.hasNextPage ?? false,
    hasPrevPage: data?.pageInfo.hasPreviousPage ?? false,
    limit: 12,
  });
  return (
    <div className="w-full p-2 rounded-md  border  overflow-auto scrollbar-thin scrollbar-thumb-neutral-500 scrollbar-track-neutral-200 dark:scrollbar-track-neutral-800">
      <div className="flex justify-end">
        <CreateMinisterDialog />
      </div>
      <DataTable table={table} />
      <TablePagination table={table} isFetching={isFetching} />
      <EditMinisterDialog />
    </div>
  );
};
