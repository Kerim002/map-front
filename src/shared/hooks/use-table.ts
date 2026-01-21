import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCallback } from "react";

type Props<T> = {
  column: ColumnDef<T, any>[];
  list: T[];
  totalPages: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};


export const useTable = <T>({
  column,
  list,
  totalPages,
  limit = 12,
  hasNextPage = false,
  hasPrevPage = false,
}: Props<T>) => {
  const navigate = useNavigate();
  const { currentPage } = useParams<{ currentPage: string }>();
  const pageIndex = Math.max(Number(currentPage || 1), 1) - 1;

  // const onPaginationChange = useCallback(
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   (updater: any) => {
  //     const next =
  //       typeof updater === "function"
  //         ? updater({ pageIndex, pageSize: limit })
  //         : updater;
  //     navigate(`/user/${next.pageIndex + 1}${search}`);
  //   },

  //   [navigate, pageIndex, search]
  // );
  const { pathname, search } = useLocation();
  const onPaginationChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (updater: any) => {
      const routeSegments = pathname.split("/").filter(Boolean);
      const lastSegment = routeSegments[routeSegments.length - 1];

      const isLastSegmentPage = !isNaN(Number(lastSegment));
      const baseRoute = isLastSegmentPage
        ? routeSegments.slice(0, -1).join("/")
        : routeSegments.join("/");
      const next =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize: limit })
          : updater;
      const newPath = `/${baseRoute}/${next.pageIndex + 1}${search}`;
      if (window.location.pathname + window.location.search !== newPath) {
        navigate(newPath);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [navigate, pageIndex, search]
  );
  const table = useReactTable({
    data: list ?? [],
    columns: column,
    state: {
      pagination: {
        pageIndex,
        pageSize: limit,
      },
    },
    pageCount: totalPages ?? -1,
    manualPagination: true,
    onPaginationChange,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return {
    table,
    pagination: table.getState().pagination,
    totalPages: totalPages,
    hasNextPage: hasNextPage,
    hasPreviousPage: hasPrevPage,
  };
};
