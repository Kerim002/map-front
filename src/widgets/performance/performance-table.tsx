import { performanceApi } from "@/entities/performance/api/performance.api";
import { performanceColumn } from "@/entities/performance/model/performance-column";
import { CreatePerformanceDialog } from "@/features/performance/dialog/create-performance-dialog";
import { EditPerformanceDialog } from "@/features/performance/dialog/edit-performance-dialog";
import { useTable } from "@/shared/hooks/use-table";
import { DataTable } from "@/shared/ui/data-table";
import { TablePagination } from "@/shared/ui/table-pagination";
import { useQuery } from "@tanstack/react-query";

export const PerformanceTable = () => {
  const { data, isFetching } = useQuery(
    performanceApi.list({ limit: 12, page: 1 })
  );

  const { table } = useTable({
    list: data?.data ?? [],
    totalPages: data?.pageInfo.totalPages ?? 0,
    column: performanceColumn,
    hasNextPage: data?.pageInfo.hasNextPage ?? false,
    hasPrevPage: data?.pageInfo.hasPreviousPage ?? false,
    limit: 12,
  });
  return (
    <div className="w-full p-2 rounded-md  border  overflow-auto scrollbar-thin scrollbar-thumb-neutral-500 scrollbar-track-neutral-200 dark:scrollbar-track-neutral-800">
      <div className="flex justify-end">
        <CreatePerformanceDialog />
      </div>
      <DataTable table={table} />
      <TablePagination table={table} isFetching={isFetching} />
      <EditPerformanceDialog />
    </div>
  );
};
