
import { trashApi } from "@/entities/trash/api/trash.api";
import { trashColumn } from "@/entities/trash/model/trash-column";
import useQueryParam from "@/shared/hooks/use-query-param";
import { useTable } from "@/shared/hooks/use-table";
import { DataTable } from "@/shared/ui/data-table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { TablePagination } from "@/shared/ui/table-pagination";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const ENTITY = ["location", "item", "employee", "region","building", "authority","city","district", "ownership","performance", "specialization"]

export const TrashTable = () => {
  const { currentPage } = useParams()
  const {t} = useTranslation()
  const {getQuery, setQuery} = useQueryParam()
  const { data, isFetching } = useQuery(trashApi.getTrash({ limit: 12, page: Number(currentPage) ?? 1, entity:getQuery("entity") }));

  const { table } = useTable({
    list: data?.data ?? [],
    totalPages: data?.pageInfo.totalPages ?? 0,
    column: trashColumn,
    hasNextPage: data?.pageInfo.hasNextPage ?? false,
    hasPrevPage: data?.pageInfo.hasPreviousPage ?? false,
    limit: 12,
  });
  return (
    <div className="w-full p-2 rounded-md  border  overflow-auto scrollbar-thin scrollbar-thumb-neutral-500 scrollbar-track-neutral-200 dark:scrollbar-track-neutral-800">
      <div className="flex">
        <Select onValueChange={e => setQuery([{key:"entity", value:e}])} value={getQuery("entity")}>
            <SelectTrigger className="w-48">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {ENTITY.map(item => <SelectItem value={item}>{t(item)}</SelectItem>)}
            </SelectContent>
        </Select>

        {/* <CreateDistrictDialog /> */}
      </div>
      <DataTable table={table} />
      <TablePagination table={table} isFetching={isFetching} />
      {/* <EditDistrictDialog /> */}
    </div>
  );
};
