import { buildingApi } from "@/entities/building/api/building.api";
import { buildingColumn } from "@/entities/building/model/building-column";
import { CreateBuildingDialog } from "@/features/building/dialog/create-building-dialog";
import { EditBuildingDialog } from "@/features/building/dialog/edit-building-dialog";
import { useTable } from "@/shared/hooks/use-table";
import { DataTable } from "@/shared/ui/data-table";
import { TablePagination } from "@/shared/ui/table-pagination";
import { useQuery } from "@tanstack/react-query";

export const BuildingTable = () => {
  const { data, isFetching } = useQuery(
    buildingApi.list({ limit: 12, page: 1 })
  );

  const { table } = useTable({
    list: data?.data ?? [],
    totalPages: data?.pageInfo.totalPages ?? 0,
    column: buildingColumn,
    hasNextPage: data?.pageInfo.hasNextPage ?? false,
    hasPrevPage: data?.pageInfo.hasPreviousPage ?? false,
    limit: 12,
  });

  return (
    <div className="w-full p-2 rounded-md  border  overflow-auto scrollbar-thin scrollbar-thumb-neutral-500 scrollbar-track-neutral-200 dark:scrollbar-track-neutral-800">
      <div className="flex justify-end">
        <CreateBuildingDialog />
      </div>
      <DataTable table={table} />
      <TablePagination table={table} isFetching={isFetching} />
      <EditBuildingDialog />
    </div>
  );
};
