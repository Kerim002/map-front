import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { useSortParam } from "@/shared/hooks/use-sort-param";
import { cn } from "@/shared/lib/utils";

type Props = {
  label: string;
  sortKey: string;
};

export const SortableHeader = ({ label, sortKey }: Props) => {
  const { orderBy, sortDir, toggleSort } = useSortParam();
  const active = orderBy === sortKey;
  const Icon = !active ? ArrowUpDown : sortDir === "desc" ? ArrowDown : ArrowUp;

  return (
    <button
      type="button"
      onClick={() => toggleSort(sortKey)}
      className={cn(
        "flex items-center gap-1 -ml-1 px-1 py-0.5 rounded transition-colors hover:text-primary",
        active && "text-primary"
      )}
    >
      <span>{label}</span>
      <Icon className="size-3" />
    </button>
  );
};
