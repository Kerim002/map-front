import { BuildingTable } from "@/widgets/building/building-table";

export const Building = () => {
  return (
    <div className="min-h-full bg-background/50 p-8 lg:p-12 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest leading-none mb-2">
            Asset Management
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground lg:text-5xl">Buildings</h1>
          <p className="text-muted-foreground text-base max-w-2xl leading-relaxed">Manage and monitor all registered building assets across the territory.</p>
        </div>
      </div>

      <div className="pt-4">
        <BuildingTable />
      </div>
    </div>
  );
};
