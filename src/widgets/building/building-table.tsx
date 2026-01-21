import { buildingApi } from "@/entities/building/api/building.api";
import { buildingColumn } from "@/entities/building/model/building-column";
import { CreateBuildingDialog } from "@/features/building/dialog/create-building-dialog";
import { EditBuildingDialog } from "@/features/building/dialog/edit-building-dialog";
import { useTable } from "@/shared/hooks/use-table";
import { DataTable } from "@/shared/ui/data-table";
import { TablePagination } from "@/shared/ui/table-pagination";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const BuildingTable = () => {
  const { currentPage } = useParams()
  const { data, isFetching } = useQuery(
    buildingApi.list({ limit: 12, page: Number(currentPage) ?? 1 })
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
    // <div className="w-full space-y-6">
    //   <div className="flex items-center justify-between pb-6 border-b border-border/30">
    //     <div className="flex items-center gap-3">

    //     </div>
    //     <CreateBuildingDialog />
    //   </div>

    //   <div className="rounded-[2rem] bg-card/30 backdrop-blur-md border border-border/50 overflow-hidden shadow-2xl shadow-primary/5">
    //     <div className="overflow-auto max-h-[600px] scrollbar-thin">
    //       <DataTable table={table} isFetchingNextPage={isFetching} />
    //     </div>
    //     <div className="p-6 bg-muted/10 border-t border-border/20">
    //       <TablePagination table={table} isFetching={isFetching} />
    //     </div>
    //   </div>

    //   <EditBuildingDialog />
    // </div>
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
