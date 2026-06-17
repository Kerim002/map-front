import { useState, useRef, useEffect, useCallback } from "react"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { X, Loader2 } from "lucide-react"
import { Input } from "@/shared/ui/input"
import { useDebounce } from "@/shared/hooks/use-debouncer"
import { useClickOutside } from "@/shared/hooks/use-click-outside"
import { useMapFilterStore } from "@/entities/store/use-map-filters-store"
import { useInView } from "react-intersection-observer"

type Props<T> = {
  filterKey: "regionId" | "buildingId" | "performanceId" | "authorityId" | "ownershipId" | "specId" | "cityId" | "districtId"
  placeholder: string
  query: (search: string) => any
  getById: (id: string) => any
  getItems: (data: any) => T[]
  getValue: (item: T) => string
  getLabel: (item: T) => string
}

// Popover width in px — wider than the trigger input
const POPOVER_WIDTH = 620

export function SearchFilterSelect<T>({
  filterKey,
  placeholder,
  query,
  getById,
  getItems,
  getValue,
  getLabel,
}: Props<T>) {
  const [search, setSearch] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  // "left" | "right" — which edge of the input the popover aligns to
  const [popoverAlign, setPopoverAlign] = useState<"left" | "right">("left")

  const { ref: loadMoreRef, inView } = useInView()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useClickOutside([inputRef, dropdownRef], () => {
    setIsOpen(false)
    setIsEditing(false)
    setSearch("")
  })

  const debouncedSearch = useDebounce(search, 300)

  const value = useMapFilterStore((s) => s.filters[filterKey])
  const setFilter = useMapFilterStore((s) => s.setFilter)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    ...query(debouncedSearch),
    enabled: isOpen,
  })

  const { data: selectedData } = useQuery({
    ...getById(value as string),
    enabled: !!value,
  })

  const items = data?.pages?.flatMap((page) => getItems(page) ?? []) ?? []
  const selectedLabel = selectedData ? getLabel(selectedData as T) : ""
  const inputDisplayValue = isEditing ? search : value ? selectedLabel : ""

  // Determine whether the popover would overflow the right edge of viewport.
  // If so, anchor it to the right side of the input instead of the left.
  const recalcAlign = useCallback(() => {
    if (!wrapperRef.current) return
    const rect = wrapperRef.current.getBoundingClientRect()
    const spaceOnRight = window.innerWidth - rect.left
    setPopoverAlign(spaceOnRight >= POPOVER_WIDTH ? "left" : "right")
  }, [])

  useEffect(() => {
    if (isOpen) recalcAlign()
  }, [isOpen, recalcAlign])

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage()
  }, [inView, hasNextPage, fetchNextPage])

  const handleFocus = () => {
    recalcAlign()
    setIsOpen(true)
    setIsEditing(true)
    if (value && selectedLabel) setSearch(selectedLabel)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setIsEditing(true)
    setIsOpen(true)
    if (value) setFilter(filterKey, undefined)
  }

  const handleSelect = (item: T) => {
    setFilter(filterKey, getValue(item))
    setSearch("")
    setIsEditing(false)
    setIsOpen(false)
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setFilter(filterKey, undefined)
    setSearch("")
    setIsEditing(false)
    setIsOpen(false)
    inputRef.current?.blur()
  }

  return (
    <div ref={wrapperRef} className="relative w-full max-w-[200px]">
      {/* Trigger input */}
      <div className="relative">
        <Input
          ref={inputRef}
          value={inputDisplayValue}
          placeholder={placeholder}
          onFocus={handleFocus}
          onChange={handleChange}
        />
        {value && (
          <button
            onMouseDown={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            type="button"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Popover — wider than the input, smart-aligned to avoid viewport overflow */}
      {isOpen && (
        <div
          ref={dropdownRef}
          style={{ maxWidth: POPOVER_WIDTH, width: "max-content", minWidth:200 }}
          className={[
            "absolute top-11 bg-popover border shadow-xl rounded-xl z-50 overflow-hidden",
            popoverAlign === "left" ? "left-0" : "right-0",
          ].join(" ")}
        >
          {/* Empty state */}
          {items.length === 0 && !isFetchingNextPage && (
            <div className="p-4 text-sm text-center text-muted-foreground">
              No results
            </div>
          )}

          {/* 2-column grid of items */}
          {items.length > 0 && (
            <div className="p-2 grid grid-cols-2 gap-1 max-h-64 overflow-y-auto">
              {items.map((item) => {
                const isSelected = value === getValue(item)
                return (
                  <button
                    key={getValue(item)}
                    type="button"
                    // onMouseDown fires before onBlur so the dropdown stays open
                    onMouseDown={() => handleSelect(item)}
                    className={[
                      "text-left px-3 py-2 rounded-lg text-sm transition-colors truncate",
                      isSelected
                        ? "bg-primary text-primary-foreground font-medium"
                        : "hover:bg-accent hover:text-accent-foreground text-foreground",
                    ].join(" ")}
                    title={getLabel(item)}
                  >
                    {getLabel(item)}
                  </button>
                )
              })}
            </div>
          )}

          {/* Infinite scroll sentinel */}
          <div ref={loadMoreRef} className="h-8 flex items-center justify-center">
            {isFetchingNextPage && (
              <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
            )}
          </div>
        </div>
      )}
    </div>
  )
}