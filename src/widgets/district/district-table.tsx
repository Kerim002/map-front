import { districtApi } from "@/entities/district";
import { districtColumn } from "@/entities/district/model/district-column";
import { CreateDistrictDialog } from "@/features/district/dialog/create-region-dialog";
import { EditDistrictDialog } from "@/features/district/dialog/edit-region-dialog";

import { useTable } from "@/shared/hooks/use-table";
import { DataTable } from "@/shared/ui/data-table";
import { TablePagination } from "@/shared/ui/table-pagination";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const DistrictTable = () => {
  const { currentPage } = useParams()
  const { data, isFetching } = useQuery(districtApi.list({ limit: 12, page: Number(currentPage) ?? 1 }));

  const { table } = useTable({
    list: data?.list ?? [],
    totalPages: data?.pageInfo.totalPages ?? 0,
    column: districtColumn,
    hasNextPage: data?.pageInfo.hasNextPage ?? false,
    hasPrevPage: data?.pageInfo.hasPreviousPage ?? false,
    limit: 12,
  });
  return (
    <div className="w-full p-2 rounded-md  border  overflow-auto scrollbar-thin scrollbar-thumb-neutral-500 scrollbar-track-neutral-200 dark:scrollbar-track-neutral-800">
      <div className="flex justify-end">
        <CreateDistrictDialog />
      </div>
      <DataTable table={table} />
      <TablePagination table={table} isFetching={isFetching} />
      <EditDistrictDialog />
    </div>
  );
};
