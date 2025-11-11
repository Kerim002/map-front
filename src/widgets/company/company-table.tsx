import { companyApi } from "@/entities/company/api/company.api";
import { companyColumn } from "@/entities/company/model/company.column";
import { CreateCompanyDialog } from "@/features/company/dialog/create-company-dialog";
import { UpdateCompanyDialog } from "@/features/company/dialog/update-company-dialog";

import { useTable } from "@/shared/hooks/use-table";
import { DataTable } from "@/shared/ui/data-table";
import { TablePagination } from "@/shared/ui/table-pagination";
import { useQuery } from "@tanstack/react-query";

export const CompanyTable = () => {
  const { data, isFetching } = useQuery(
    companyApi.list({ limit: 12, page: 1 })
  );

  const { table } = useTable({
    list: data?.data ?? [],
    totalPages: data?.pageInfo.totalPages ?? 0,
    column: companyColumn,
    hasNextPage: data?.pageInfo.hasNextPage ?? false,
    hasPrevPage: data?.pageInfo.hasPreviousPage ?? false,
    limit: 12,
  });
  return (
    <div className="w-full p-2 rounded-md  border  overflow-auto scrollbar-thin scrollbar-thumb-neutral-500 scrollbar-track-neutral-200 dark:scrollbar-track-neutral-800">
      <div className="flex justify-end">
        <CreateCompanyDialog />
      </div>
      <DataTable table={table} />
      <TablePagination table={table} isFetching={isFetching} />
      <UpdateCompanyDialog />
      {/* <EditBuildingDialog /> */}
    </div>
  );
};
