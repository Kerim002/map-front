import { useMapStore } from "@/entities/store/use-map-store";
import { Input } from "@/shared/ui/input";
import { Switch } from "@/shared/ui/switch";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Search, Map as MapIcon, Edit2 } from "lucide-react";

export const MapNavbar = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { toggleCursor, isEditMap } = useMapStore();

  useEffect(() => {
    if (!open) return;
    const timeout = setTimeout(() => {
      const all = Array.from({ length: 6 }, (_, i) => `Plot Area #${1024 + i}`);
      setResults(
        query
          ? all.filter((r) => r.toLowerCase().includes(query.toLowerCase()))
          : all
      );
    }, 150);

    return () => clearTimeout(timeout);
  }, [query, open]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!inputRef.current) return;
      if (!inputRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="absolute top-6 left-6 right-6 z-[400] flex items-center justify-between pointer-events-none gap-6">
      <div className="flex items-center gap-4 pointer-events-auto">
        <div className="relative group w-96" ref={inputRef}>
          <div className="absolute inset-0 bg-primary/20 rounded-[1.25rem] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />

          <div className="relative flex items-center">
            <div className="absolute left-4 text-muted-foreground/60 transition-colors group-focus-within:text-primary z-10">
              <Search className="h-4 w-4" />
            </div>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setOpen(true)}
              placeholder={t("Search by plot, owner or ID...")}
              className="pl-11 h-12 bg-background/40 backdrop-blur-xl border-border/50 shadow-2xl w-full rounded-[1.25rem] focus-visible:ring-1 focus-visible:ring-primary/20 transition-all font-semibold placeholder:text-muted-foreground/40 placeholder:font-medium"
            />
          </div>

          {/* Premium Dropdown */}
          <div
            className={`absolute left-0 right-0 mt-3 transition-all duration-500 origin-top ${open
              ? "opacity-100 scale-100 translate-y-0 visible"
              : "opacity-0 scale-95 -translate-y-4 invisible"
              }`}
          >
            <div className="rounded-[1.5rem] bg-background/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-border/50 overflow-hidden py-2">
              <div className="px-4 py-2 text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest border-b border-border/10 mb-1">
                Registry Results
              </div>
              {results.length === 0 ? (
                <div className="p-8 text-xs font-bold text-muted-foreground/60 text-center flex flex-col items-center gap-2">
                  <div className="p-3 bg-muted/20 rounded-2xl">
                    <Search className="size-5 opacity-20" />
                  </div>
                  {t("no-results-found")}
                </div>
              ) : (
                <ul className="space-y-1 px-2">
                  {results.map((item, i) => (
                    <li
                      key={i}
                      className="cursor-pointer px-4 py-3 text-sm flex items-center justify-between group/item hover:bg-primary/5 rounded-xl transition-all border border-transparent hover:border-primary/10"
                      onMouseDown={() => {
                        setQuery(item);
                        setOpen(false);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-all duration-300">
                          <MapIcon className="h-4 w-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-foreground/80 group-hover/item:text-foreground">{item}</span>
                          <span className="text-[10px] font-medium text-muted-foreground">Ashgabat, Sector 4</span>
                        </div>
                      </div>
                      <div className="text-[10px] font-black text-primary opacity-0 group-hover/item:opacity-100 transition-opacity uppercase tracking-widest">Select</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 pointer-events-auto bg-background/40 backdrop-blur-xl px-6 h-12 rounded-[1.25rem] shadow-2xl border border-border/50 transition-all hover:bg-background/60">
        <div className="flex items-center gap-3 border-r border-border/20 pr-6">
          <div className={`p-1.5 rounded-lg ${isEditMap ? "bg-primary text-primary-foreground" : "bg-muted/30 text-muted-foreground/40"}`}>
            <Edit2 className="h-3.5 w-3.5" />
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Edit Mode</span>
        </div>
        <div className="flex items-center gap-3">
          <Switch
            checked={isEditMap}
            onCheckedChange={toggleCursor}
            className="data-[state=checked]:bg-primary shadow-sm"
          />
          <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isEditMap ? "text-primary" : "text-muted-foreground/40"}`}>
            {isEditMap ? "Active" : "Locked"}
          </span>
        </div>
      </div>
    </div>
  );
};
