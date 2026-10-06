import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export type SortDir = "asc" | "desc";

// Drives order_by/sort_by via the URL so sort state survives navigation and refresh.
export const useSortParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const orderBy = searchParams.get("order_by") ?? undefined;
  const sortDir = (searchParams.get("sort_by") as SortDir | null) ?? "asc";

  const toggleSort = useCallback(
    (key: string) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (next.get("order_by") !== key) {
          next.set("order_by", key);
          next.set("sort_by", "asc");
        } else if (next.get("sort_by") !== "desc") {
          next.set("sort_by", "desc");
        } else {
          next.delete("order_by");
          next.delete("sort_by");
        }
        return next;
      });
    },
    [setSearchParams]
  );

  const setOrderBy = useCallback(
    (key: string | undefined) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (!key) {
          next.delete("order_by");
          next.delete("sort_by");
        } else {
          next.set("order_by", key);
          if (!next.get("sort_by")) next.set("sort_by", "asc");
        }
        return next;
      });
    },
    [setSearchParams]
  );

  const setSortDir = useCallback(
    (dir: SortDir) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set("sort_by", dir);
        return next;
      });
    },
    [setSearchParams]
  );

  return {
    orderBy,
    sortDir,
    sortParams: { order_by: orderBy, sort_by: orderBy ? sortDir : undefined },
    toggleSort,
    setOrderBy,
    setSortDir,
  };
};
