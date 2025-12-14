import { cn } from "@/shared/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { flexRender, type Table as TableProps } from "@tanstack/react-table";
import { InView } from "react-intersection-observer";

type Props<T> = {
  table: TableProps<T>;
  isLoading?: boolean;
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
};

export const DataTable = <T,>({
  table,
  isLoading,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: Props<T>) => {
  const rowLength = table?.getAllColumns()?.length ?? 0;

  return (
    <div className="bg-white dark:bg-white/10 p-3 rounded-2xl ">
      <Table className="w-full  h-full relative">
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id}>
              {hg.headers.map((header) => (
                <TableHead
                  // className={cn(header.column.columnDef.meta)}
                  key={header.id}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className=" scroll-smooth">
          {isLoading ? (
            Array.from({ length: 12 }).map((_, i) => (
              <TableRow key={`skeleton-row-${i}`}>
                {Array.from({ length: rowLength }).map((_, j) => (
                  <TableCell key={`skeleton-cell-${j}`}>
                    <div
                      className={cn(
                        "h-10 w-full bg-gray-300 rounded animate-pulse",
                        j === 0 && "w-2",
                        j === rowLength - 1 && "w-16"
                      )}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : table.getRowModel().rows.length > 0 ? (
            <>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      // className={cn(cell.column.columnDef.meta?.className)}
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              {hasNextPage && (
                <InView
                  as="tr"
                  onChange={(inView) => {
                    if (inView && !isFetchingNextPage && fetchNextPage) {
                      fetchNextPage();
                    }
                  }}
                >
                  <td colSpan={12} className="text-center py-4">
                    {isFetchingNextPage ? "Loading..." : "Loading Data..."}
                  </td>
                </InView>
              )}
            </>
          ) : (
            <TableRow className="flex-1">
              <TableCell colSpan={rowLength} className="text-center py-8">
                🕸️ No data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
