import { regionApi } from "@/entities/region";
import { regionColumn } from "@/entities/region/model/region-column";
import { CreateRegionDialog } from "@/features/region/dialog/create-region-dialog";
import { EditRegionDialog } from "@/features/region/dialog/edit-region-dialog";
import { useTable } from "@/shared/hooks/use-table";
import { DataTable } from "@/shared/ui/data-table";
import { TablePagination } from "@/shared/ui/table-pagination";
import { useQuery } from "@tanstack/react-query";

export const RegionTable = () => {
  const { data, isFetching } = useQuery(regionApi.list({ limit: 12, page: 1 }));

  const { table } = useTable({
    list: data?.list ?? [],
    totalPages: data?.pageInfo.totalPages ?? 0,
    column: regionColumn,
    hasNextPage: data?.pageInfo.hasNextPage ?? false,
    hasPrevPage: data?.pageInfo.hasPreviousPage ?? false,
    limit: 12,
  });
  return (
    <div className="w-full p-2 rounded-md  border  overflow-auto scrollbar-thin scrollbar-thumb-neutral-500 scrollbar-track-neutral-200 dark:scrollbar-track-neutral-800">
      <div className="flex justify-end">
        <CreateRegionDialog />
      </div>
      <DataTable table={table} />
      <TablePagination table={table} isFetching={isFetching} />
      <EditRegionDialog />
    </div>
  );
};
