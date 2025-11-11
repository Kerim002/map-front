import type { Table } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";
import { Input } from "./input";
import { Loader2 } from "lucide-react";
import { useDebounce } from "../hooks/use-debouncer";

interface Props<T> {
  table: Table<T>;
  isFetching?: boolean;
}
export const TablePagination = <T,>({ table, isFetching }: Props<T>) => {
  const { currentPage } = useParams<{ currentPage: string }>();
  const navigate = useNavigate();
  const pageIndex = Math.max(Number(currentPage || 1), 1);
  const pageCount = table.getPageCount();
  const [inputValue, setInputValue] = useState(pageIndex);
  const debouncedPage = useDebounce(inputValue, 500);
  const { pathname, search } = useLocation();
  useEffect(() => {
    const routeSegments = pathname.split("/").filter(Boolean);
    const lastSegment = routeSegments[routeSegments.length - 1];
    const isLastSegmentPage = !isNaN(Number(lastSegment));
    const baseRoute = isLastSegmentPage
      ? routeSegments.slice(0, -1).join("/")
      : routeSegments.join("/");
    if (debouncedPage >= 1 && debouncedPage <= pageCount) {
      const newPath = `/${baseRoute}/${debouncedPage}${search}`;
      if (window.location.pathname + window.location.search !== newPath) {
        navigate(newPath);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedPage]);
  useEffect(() => {
    setInputValue(pageIndex);
  }, [pageIndex]);
  const goToNextPage = () => {
    table.nextPage();
  };

  const goToPreviousPage = () => {
    table.previousPage();
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= pageCount) {
      table.setPageIndex(page - 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];

    pages.push(
      <PaginationItem key={1}>
        <PaginationLink
          isActive={pageIndex === 1}
          onClick={() => table.firstPage()}
        >
          {isFetching && pageIndex === 1 ? (
            <Loader2 className="animate-spin" />
          ) : (
            1
          )}
        </PaginationLink>
      </PaginationItem>
    );

    if (pageCount > 5 && pageIndex > 3) {
      pages.push(
        <PaginationItem key="left-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    const startPage = Math.max(2, pageIndex - 1);
    const endPage = Math.min(pageCount - 1, pageIndex + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={pageIndex === i}
            onClick={() => goToPage(i)}
          >
            {isFetching && pageIndex === i ? (
              <Loader2 className="animate-spin" />
            ) : (
              i
            )}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (pageIndex < pageCount - 2) {
      pages.push(
        <PaginationItem key="right-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    if (pageCount > 1) {
      pages.push(
        <PaginationItem key={pageCount}>
          <PaginationLink
            isActive={pageIndex === pageCount}
            onClick={() => table.lastPage()}
          >
            {isFetching && pageIndex === pageCount ? (
              <Loader2 className="animate-spin" />
            ) : (
              pageCount
            )}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center gap-4  justify-center">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={goToPreviousPage} />
        </PaginationItem>
        {renderPageNumbers()}
        <PaginationItem>
          <PaginationNext onClick={goToNextPage} />
        </PaginationItem>
      </PaginationContent>
      <Input
        type="number"
        min={1}
        max={pageCount}
        className="w-20"
        value={inputValue}
        onChange={(e) => {
          const val = Number(e.target.value);
          if (!isNaN(val)) {
            setInputValue(val);
          }
        }}
      />
    </div>
  );
};
