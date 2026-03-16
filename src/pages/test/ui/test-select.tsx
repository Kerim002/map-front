// import { useState, useRef, useEffect } from "react"
// import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
// import { X, Loader2 } from "lucide-react"
// import { Input } from "@/shared/ui/input"
// import { useDebounce } from "@/shared/hooks/use-debouncer"
// import { useClickOutside } from "@/shared/hooks/use-click-outside"
// import { useMapFilterStore } from "@/entities/store/use-map-filters-store"
// import { useInView } from "react-intersection-observer" // Install this: npm i react-intersection-observer

// type Props<T> = {
//   filterKey: "regionId" | "buildingId" | "performanceId" | "authorityId" | "ownershipId"
//   placeholder: string
//   query: (search: string) => any
//   getById: (id: string) => any
//   getItems: (data: any) => T[]
//   getValue: (item: T) => string
//   getLabel: (item: T) => string
// }

// export function TestSelect<T>({
//   filterKey,
//   placeholder,
//   query,
//   getItems,
//   getValue,
//   getLabel,
// }: Props<T>) {
//   const [search, setSearch] = useState("")
//   const [isOpen, setIsOpen] = useState(false)
//   const { ref: loadMoreRef, inView } = useInView()

//   const inputRef = useRef<HTMLInputElement>(null)
//   const dropdownRef = useRef<HTMLDivElement>(null)
//   useClickOutside([inputRef, dropdownRef], () => setIsOpen(false))

//   const debouncedSearch = useDebounce(search, 300)

//   const value = useMapFilterStore((s) => s.filters[filterKey])
//   const setFilter = useMapFilterStore((s) => s.setFilter)

//   // 1. Fetching Infinite List
//   const { 
//     data, 
//     fetchNextPage, 
//     hasNextPage, 
//     isFetchingNextPage 
//   } = useInfiniteQuery({
//     ...query(debouncedSearch),
//     enabled: isOpen, // Only fetch when dropdown is open to save resources
//   })

//   // 2. Fetching Single Selected Item (to show label when ID exists but list isn't loaded)
//   // const { data: selectedData } = useQuery({
//   //   ...getById(value as string),
//   //   enabled: !!value,
//   // })

//   // Flatten pages into a single array
//   const items = data?.pages.flatMap((page) => getItems(page)) ?? []
  
//   // Find the label for the current selection
//   // const selectedLabel = selectedData ? getLabel(selectedData as T) : ""

//   // Trigger next page when scrolling to bottom
//   useEffect(() => {
//     if (inView && hasNextPage) {
//       fetchNextPage()
//     }
//   }, [inView, hasNextPage, fetchNextPage])

//   const handleSelect = (item: T) => {
//     setFilter(filterKey, getValue(item))
//     setSearch(getLabel(item))
//     setIsOpen(false)
//   }

//   const handleClear = (e: React.MouseEvent) => {
//     e.stopPropagation()
//     setFilter(filterKey, undefined)
//     setSearch("")
//   }

//   return (
//     <div className="relative w-full max-w-[200px]">
//       <div className="relative">
//         <Input
//           ref={inputRef}
//           value={search}
//           placeholder={placeholder}
//           onFocus={() => setIsOpen(true)}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         {value && (
//           <button
//             onClick={handleClear}
//             className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
//           >
//             <X size={14} />
//           </button>
//         )}
//       </div>

//       {isOpen && (
//         <div
//           ref={dropdownRef}
//           className="absolute top-11 left-0 right-0 bg-popover border shadow-md rounded-md max-h-60 overflow-y-auto z-50 p-1"
//         >
//           {items.length === 0 && !isFetchingNextPage && (
//             <div className="p-2 text-sm text-center text-muted-foreground">No results</div>
//           )}
          
//           {items.map((item) => (
//             <div
//               key={getValue(item)}
//               onClick={() => handleSelect(item)}
//               className={`cursor-pointer p-2 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground ${
//                 value === getValue(item) ? "bg-accent/50 font-medium" : ""
//               }`}
//             >
//               {getLabel(item)}
//             </div>
//           ))}

//           {/* Observer Element */}
//           <div ref={loadMoreRef} className="h-8 flex items-center justify-center">
//             {isFetchingNextPage && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }