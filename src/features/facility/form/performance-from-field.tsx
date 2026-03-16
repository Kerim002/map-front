import { performanceApi } from "@/entities/performance/api/performance.api";
import { useClickOutside } from "@/shared/hooks/use-click-outside";
import { useDebounce } from "@/shared/hooks/use-debouncer";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { useInfiniteQuery } from "@tanstack/react-query";
import { X, Loader2 } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useInView } from "react-intersection-observer"; // Ensure this is installed
import type {
  FieldValues,
  Path,
  PathValue,
  UseFormReturn,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
};

export const PerformanceFormField = <T extends FieldValues>({
  form,
  name,
  label,
}: Props<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const boxRef = useRef<HTMLInputElement>(null);
  const dropDownRef = useRef<HTMLDivElement>(null);
  
  // 1. Hook for infinite scroll detection
  const { ref: loadMoreRef, inView } = useInView();

  useClickOutside([boxRef, dropDownRef], () => setIsOpen(false));
  const debounceText = useDebounce(search, 300);

  // 2. Switch to Infinite Query
  const { 
    data, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useInfiniteQuery({
    ...performanceApi.getPerformanceInfitityQuery({ 
        limit: 20, 
        page: 1, 
        search: debounceText 
    }),
    enabled: isOpen, // Saves bandwidth: only fetch when user opens dropdown
  });

  // 3. Flatten the pages from TanStack Query
  const items = data?.pages.flatMap((page: any) => page.data) ?? [];

  const selectedItem = form.watch(name);

  // 4. Trigger fetch when user scrolls to bottom
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const handleSelect = ({
    id,
    valueName,
  }: {
    id: string;
    valueName: string;
  }) => {
    form.setValue(name, { id, type: valueName } as PathValue<T, Path<T>>, {
        shouldValidate: true,
        shouldDirty: true
    });
    setSearch(valueName);
    setIsOpen(false);
  };

  const { i18n } = useTranslation();
  const currentLang = (i18n.language || "ru") as "en" | "ru" | "tk";

  useEffect(() => {
    if (selectedItem?.id) {
      setSearch(selectedItem.type);
    }
  }, [selectedItem?.id, selectedItem?.type]);

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleSelect({ valueName: "", id: "" });
    setSearch("");
  };

  return (
    <div className="space-y-2 relative flex-1">
      <Label>{label}</Label>
      <div className="relative">
        <Input
          ref={boxRef}
          onFocus={() => setIsOpen(true)}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-10 pr-10 bg-white"
        />
        {selectedItem?.id && (
          <Button
            onClick={handleRemove}
            type="button"
            className="absolute right-0 top-0 h-10 w-10 hover:bg-transparent"
            variant="ghost"
          >
            <X size={16} />
          </Button>
        )}
      </div>

      {form.formState.errors[name] && (
        <p className="text-sm text-red-500">
          {(form.formState.errors[name] as any)?.message || 
           (form.formState.errors[name] as any)?.id?.message}
        </p>
      )}

      {isOpen && (
        <div
          ref={dropDownRef}
          className="max-h-64 overflow-y-auto absolute left-0 right-0 top-[74px] border rounded-lg p-1 bg-white dark:bg-zinc-900 z-50 shadow-lg"
        >
          {items.length === 0 && !isFetchingNextPage && (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Ничего не найдено
            </div>
          )}

          {items.map((item: any) => (
            <div
              key={item.id}
              onClick={() => handleSelect({ 
                id: item.id, 
                valueName: item[currentLang] || item.ru 
              })}
              className={`cursor-pointer rounded-md p-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors ${
                selectedItem?.id === item.id ? "bg-gray-200 dark:bg-zinc-800 font-medium" : ""
              }`}
            >
              {item[currentLang] || item.ru}
            </div>
          ))}

          {/* Observer Element */}
          <div ref={loadMoreRef} className="h-10 flex items-center justify-center">
            {isFetchingNextPage && (
              <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};