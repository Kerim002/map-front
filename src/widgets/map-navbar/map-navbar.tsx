import { useMapStore } from "@/entities/store/use-map-store";
import { Input } from "@/shared/ui/input";
import { Switch } from "@/shared/ui/switch";
import { useEffect, useRef, useState } from "react";

export const MapNavbar = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { toggleCursor, isEditMap } = useMapStore();

  useEffect(() => {
    if (!open) return;
    const timeout = setTimeout(() => {
      const all = Array.from({ length: 10 }, (_, i) => `Result ${i + 1}`);
      setResults(
        query
          ? all.filter((r) => r.toLowerCase().includes(query.toLowerCase()))
          : all
      );
    }, 150);

    return () => clearInterval(timeout);
  }, [query, open]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!inputRef.current) return;
      if (!inputRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="relative" ref={inputRef}>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
            placeholder="Search..."
            className="bg-white w-80 rounded-full"
          />

          {/* Dropdown under the input */}
          <div
            className={`absolute left-0 right-0 mt-2 transition-all duration-200 ${
              open
                ? "opacity-100 translate-y-0 visible"
                : "opacity-0 -translate-y-2 invisible"
            }`}
          >
            <div className="rounded-xl bg-white shadow-lg ring-1 ring-black/5 overflow-hidden">
              {results.length === 0 ? (
                <div className="p-3 text-sm text-gray-400">No results</div>
              ) : (
                <ul>
                  {results.map((item, i) => (
                    <li
                      key={i}
                      className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-50 border-b last:border-b-0"
                      onMouseDown={() => {
                        setQuery(item);
                        setOpen(false);
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* <Button className="shadow-md shadow-neutral-500" variant="secondary">
        Ammar
      </Button> */}
      <Switch checked={isEditMap} onCheckedChange={toggleCursor} />
    </div>
  );
};
