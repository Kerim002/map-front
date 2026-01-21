import { employeeApi } from "@/entities/employee/api/employee.api";
import { employeeColumn } from "@/entities/employee/model/employee-column";
import { CreateEmployeeDialog } from "@/features/employee/dialog/create-employee-dialog";
import { UpdateEmployeeDialog } from "@/features/employee/dialog/update-employee-dialog";
import { useTable } from "@/shared/hooks/use-table";
import { DataTable } from "@/shared/ui/data-table";
import { TablePagination } from "@/shared/ui/table-pagination";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import 'react-photo-view/dist/react-photo-view.css';

export const EmployeeTable = () => {
  const date = Date.now()
     const { currentPage } = useParams()
  
  console.log(date)
  const {facilityId} = useParams()
  const { data, isFetching } = useQuery(
    employeeApi.list({ limit: 12, page: Number(currentPage) ?? 1 , location_id:facilityId??"" })
  );

  const { table } = useTable({
    list: data?.data ?? [],
    totalPages: data?.pageInfo.totalPages ?? 0,
    column: employeeColumn,
    hasNextPage: data?.pageInfo.hasNextPage ?? false,
    hasPrevPage: data?.pageInfo.hasPreviousPage ?? false,
    limit: 12,
  });
  
  return (
    <div className="w-full p-2 rounded-md  border  overflow-auto scrollbar-thin scrollbar-thumb-neutral-500 scrollbar-track-neutral-200 dark:scrollbar-track-neutral-800">
      <div className="flex justify-end">
        <CreateEmployeeDialog/>
      </div>
      {/* <PhotoProvider> */}

      <DataTable table={table} />
      {/* </PhotoProvider> */}
      <TablePagination table={table} isFetching={isFetching} />
      <UpdateEmployeeDialog/>
    </div>
  );
};
