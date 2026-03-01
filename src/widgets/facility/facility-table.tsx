import { facilityApi } from "@/entities/facility/api/facility.api";
import { facilityColumn } from "@/entities/facility/model/facility-column";
import { CreateFacilitySheet } from "@/features/facility/sheet/create-facility-sheet"
import { UpdateFacilitySheet } from "@/features/facility/sheet/update-facility-sheet";
import useQueryParam from "@/shared/hooks/use-query-param";
import { useTable } from "@/shared/hooks/use-table";
import { DataTable } from "@/shared/ui/data-table";
import { TablePagination } from "@/shared/ui/table-pagination";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const FacilityTable = () => {
    const { currentPage, facilityId } = useParams()
    const {getQuery} = useQueryParam()

    const { data, isFetching } = useQuery(facilityApi.facilityList({ limit: 12, enabled: true, page: Number(currentPage) ?? 1, parent_id:facilityId, rental:getQuery("rental") ? getQuery("rental") === "true" ? true : false : undefined }))
    const { table } = useTable({
        list: data?.data ?? [],
        totalPages: data?.pageInfo.totalPages ?? 0,
        column: facilityColumn,
        hasNextPage: data?.pageInfo.hasNextPage ?? false,
        hasPrevPage: data?.pageInfo.hasPreviousPage ?? false,
        limit: 12,
    });

    return (
        <div className="w-full p-2 rounded-md  border  overflow-auto scrollbar-thin scrollbar-thumb-neutral-500 scrollbar-track-neutral-200 dark:scrollbar-track-neutral-800">
            <div className="flex justify-end">
                <CreateFacilitySheet />
            </div>

            <DataTable table={table} />
            <TablePagination table={table} isFetching={isFetching} />
            {/* <EditOwnershipDialog /> */}
            <UpdateFacilitySheet/>
        </div>
    )
}
