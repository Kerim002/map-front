// import { useMemo } from "react";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export default function useQueryParam() {
  const [searchParams, setSearchParams] = useSearchParams();
  const getQuery = useCallback(
    (key: string) => {
      return searchParams.get(key) ?? undefined;
    },
    [searchParams]
  );
  const setQuery = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (queries: { key: string; value: any }[]) => {
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        queries.forEach((item) => {
          newParams.set(item.key, `${item.value}`);
        });
        return newParams;
      });
    },
    [setSearchParams]
  );
  const deleteQuery = useCallback(
    (keys: string[]) => {
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        keys.forEach((key) => newParams.delete(key));
        return newParams;
      });
    },
    [setSearchParams]
  );
  const deleteAllQuery = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);
  return { getQuery, setQuery, deleteQuery, deleteAllQuery };
}
