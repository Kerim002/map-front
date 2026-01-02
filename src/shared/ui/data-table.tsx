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
    <div className="w-full">
      <Table className="w-full border-collapse">
        <TableHeader className="bg-muted/10">
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id} className="hover:bg-transparent border-0 border-b border-border/30">
              {hg.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="h-14 px-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 transition-colors hover:text-primary"
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
        <TableBody className="divide-y divide-border/20">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <TableRow key={`skeleton-row-${i}`} className="border-0">
                {Array.from({ length: rowLength }).map((_, j) => (
                  <TableCell key={`skeleton-cell-${j}`} className="px-6 py-4">
                    <div
                      className={cn(
                        "h-8 w-full bg-muted/30 rounded-lg animate-pulse",
                        j === 0 && "w-1/2",
                        j === rowLength - 1 && "w-1/3 ml-auto"
                      )}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : table.getRowModel().rows.length > 0 ? (
            <>
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="group hover:bg-primary/[0.02] transition-all duration-300 border-0 relative"
                >
                  {row.getVisibleCells().map((cell, idx) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        "px-6 py-5 text-sm font-semibold text-foreground/70 group-hover:text-foreground transition-colors",
                        idx === 0 && "relative"
                      )}
                    >
                      {/* Left border indicator on hover */}
                      {idx === 0 && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      )}
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
                  <td colSpan={rowLength} className="text-center py-6">
                    {isFetchingNextPage ? (
                      <div className="inline-flex items-center gap-2 text-xs font-black text-primary animate-pulse">
                        Loading more assets...
                      </div>
                    ) : (
                      <div className="text-[10px] font-black text-muted-foreground/30 uppercase tracking-widest">End of results</div>
                    )}
                  </td>
                </InView>
              )}
            </>
          ) : (
            <TableRow>
              <TableCell colSpan={rowLength} className="text-center py-20">
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 bg-muted/20 rounded-3xl">
                    <span className="text-4xl opacity-50 text-muted-foreground">🕸️</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-black text-foreground/50">Registry is empty</span>
                    <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-wider">No matching records found</span>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
