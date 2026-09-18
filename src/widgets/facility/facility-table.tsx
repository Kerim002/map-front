import { facilityApi } from "@/entities/facility/api/facility.api";
import type { FacilitySearchQuery } from "@/entities/facility/api/query-type/facility-query";
import { facilityColumn } from "@/entities/facility/model/facility-column";
import { CreateFacilitySheet } from "@/features/facility/sheet/create-facility-sheet"
import { UpdateFacilitySheet } from "@/features/facility/sheet/update-facility-sheet";
import { useTable } from "@/shared/hooks/use-table";
import { DataTable } from "@/shared/ui/data-table";
import { TablePagination } from "@/shared/ui/table-pagination";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import { useMemo } from "react";

// `filters` lets callers reuse this table for any /location filter
// (authority_id, building_id, region_id, …). Defaults keep the existing
// route-driven behaviour (parent_id + rental) untouched.
// `hideCreate` drops the "add facility" button and `hideOrder` drops the order
// column + reorder button where they don't apply (e.g. the filtered locations view).
type Props = { filters?: Partial<FacilitySearchQuery>; hideCreate?: boolean; hideOrder?: boolean; absoluteDetail?: boolean };

export const FacilityTable = ({ filters, hideCreate, hideOrder, absoluteDetail }: Props = {}) => {
    const { currentPage, facilityId } = useParams()
    const { pathname } = useLocation()
    // Route-driven rental filter only applies to the plain list; the filtered
    // (by-category) view shouldn't send a rental param at all.
    const isInRental = filters ? undefined : pathname.includes("/rentals")
    const { data, isFetching } = useQuery(facilityApi.facilityList({ limit: 12, enabled: true, page: Number(currentPage) ?? 1, parent_id: facilityId, rental: isInRental, ...filters }))
    const columns = useMemo(() => facilityColumn({ withOrder: !hideOrder, absoluteDetail }), [hideOrder, absoluteDetail])
    const { table } = useTable({
        list: data?.data ?? [],
        totalPages: data?.pageInfo.totalPages ?? 0,
        column: columns,
        hasNextPage: data?.pageInfo.hasNextPage ?? false,
        hasPrevPage: data?.pageInfo.hasPreviousPage ?? false,
        limit: 12,
    });

    return (
        <div className="w-full p-2 rounded-md  border  overflow-auto scrollbar-thin scrollbar-thumb-neutral-500 scrollbar-track-neutral-200 dark:scrollbar-track-neutral-800">
            {!hideCreate && (
                <div className="flex justify-end">
                    <CreateFacilitySheet />
                </div>
            )}

            <DataTable table={table} />
            <TablePagination table={table} isFetching={isFetching} />
            {/* <EditOwnershipDialog /> */}
            <UpdateFacilitySheet />
        </div>
    )
}
