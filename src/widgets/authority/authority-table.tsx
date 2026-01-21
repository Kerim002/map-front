import { authorityApi } from "@/entities/authority/api/authority.api";
import { authorityColumn } from "@/entities/authority/model/authority-column";
import { CreateAuthorityDialog } from "@/features/authority/dialog/create-authority-dialog";
import { EditAuthorityDialog } from "@/features/authority/dialog/edit-authority-dialog";
import { useTable } from "@/shared/hooks/use-table";
import { DataTable } from "@/shared/ui/data-table";
import { TablePagination } from "@/shared/ui/table-pagination";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const AuthorityTable = () => {
    const { currentPage } = useParams()
  const { data, isFetching } = useQuery(
    authorityApi.list({ limit: 12, page: Number(currentPage) ?? 1 })
  );

  const { table } = useTable({
    list: data?.data ?? [],
    totalPages: data?.pageInfo.totalPages ?? 0,
    column: authorityColumn,
    hasNextPage: data?.pageInfo.hasNextPage ?? false,
    hasPrevPage: data?.pageInfo.hasPreviousPage ?? false,
    limit: 12,
  });
  return (
    // <div className="p-3">
    //   <div className="w-full p-3 bg-white/5 space-y-2 rounded-2xl  border  overflow-auto scrollbar-thin scrollbar-thumb-neutral-500 scrollbar-track-neutral-200 dark:scrollbar-track-neutral-800">
    //     <div className="flex justify-between">
    //       <SearchInput containerClassName="" />
    //       <CreateAuthorityDialog />
    //     </div>
    //     <DataTable table={table} />
    //     <TablePagination table={table} isFetching={isFetching} />
    //     <EditAuthorityDialog />
    //   </div>
    // </div>
    <div className="w-full p-2 rounded-md  border  overflow-auto scrollbar-thin scrollbar-thumb-neutral-500 scrollbar-track-neutral-200 dark:scrollbar-track-neutral-800">
      <div className="flex justify-end">
        <CreateAuthorityDialog />
      </div>
      <DataTable table={table} />
      <TablePagination table={table} isFetching={isFetching} />
      <EditAuthorityDialog  />
    </div>
  );
};
