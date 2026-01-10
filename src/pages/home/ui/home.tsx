import { type ElementType } from "react";
import {
  Building2,
  AreaChart,
  MapPin,
  CheckCircle,
  Truck,
  Factory,
  AlertTriangle,
  Barcode,
} from "lucide-react";

// Shadcn UI Imports (Assuming paths are correct)
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { ChartAreaInteractive } from "./chart-area-interactive";
import { useTranslation } from "react-i18next";

// mockData.ts (or placed inside the component)
export interface RegionData {
  region: string; // e.g., 'Ahal', 'Balkan', 'Ashgabat City'
  totalBuildings: number;
  totalAreaSqKm: number;
  complianceRate: number; // Percentage 0-100
}

export interface BuildingTypeCount {
  type: "Warehouse" | "Market" | "Factory" | "Office" | "Residential";
  count: number;
}

export interface KeyMetric {
  title: string;
  value: string;
  change?: string;
  icon: ElementType;
}

const REGIONAL_DATA: RegionData[] = [
  {
    region: "Ashgabat City",
    totalBuildings: 480,
    totalAreaSqKm: 260,
    complianceRate: 98.1,
  },
  {
    region: "Ahal Welaýaty",
    totalBuildings: 320,
    totalAreaSqKm: 97260,
    complianceRate: 85.5,
  },
  {
    region: "Balkan Welaýaty",
    totalBuildings: 180,
    totalAreaSqKm: 139300,
    complianceRate: 90.2,
  },
  {
    region: "Daşoguz Welaýaty",
    totalBuildings: 250,
    totalAreaSqKm: 73400,
    complianceRate: 78.8,
  },
  {
    region: "Lebap Welaýaty",
    totalBuildings: 290,
    totalAreaSqKm: 93700,
    complianceRate: 81.3,
  },
  {
    region: "Mary Welaýaty",
    totalBuildings: 350,
    totalAreaSqKm: 87200,
    complianceRate: 88.9,
  },
];

const TYPE_DATA: BuildingTypeCount[] = [
  { type: "Warehouse", count: 580 },
  { type: "Factory", count: 320 },
  { type: "Market", count: 410 },
  { type: "Office", count: 250 },
  { type: "Residential", count: 310 },
];
const METRICS: KeyMetric[] = [
  {
    title: "total-registered-buildings",
    value: "1,870",
    change: "+7% YTD",
    icon: Building2,
  },
  {
    title: "total-cadastre-area-km",
    value: "491,220",
    change: "—",
    icon: AreaChart,
  },
  {
    title: "authority-violations-q4",
    value: "42",
    change: "-12% vs Q3",
    icon: AlertTriangle,
  },
  {
    title: "ownership",
    value: "18",
    icon: Barcode,
  },
];

// --- MAIN DASHBOARD COMPONENT ---

export function Home() {
  const totalCompliance = REGIONAL_DATA.reduce(
    (sum, item) => sum + item.complianceRate,
    0
  );
  const averageCompliance = (totalCompliance / REGIONAL_DATA.length).toFixed(1);
  const { t } = useTranslation();

  return (
    <div className="min-h-full bg-background/50 p-6 lg:p-10 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1.5">

          <h1 className="text-4xl font-bold tracking-tight text-foreground lg:text-4xl">
            {t("turkmenistan-cadastre-dashboard")}
          </h1>
          <p className="text-muted-foreground text-base max-w-2xl leading-relaxed">
            {t("overview-of-registered-buildings-and-area-by-administrative-region-welayat")}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-12 w-[1px] bg-border/50 hidden md:block mx-4" />
          <div className="text-right">
            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-0.5">Global Compliance</div>
            <div className="text-2xl font-black text-primary tabular-nums">{averageCompliance}%</div>
          </div>
        </div>
      </div>

      {/* BENTO GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">

        {/* Row 1: Key Metrics (4 cols) */}
        {METRICS.slice(0, 4).map((metric, idx) => (
          <Card
            key={metric.title}
            className={`group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 rounded-3xl ${idx === 0 ? "lg:col-span-1" : ""
              }`}
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <metric.icon className="size-24 -mr-8 -mt-8" />
            </div>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className={`p-2.5 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500`}>
                <metric.icon className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">{t(metric.title)}</span>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-3xl font-black tracking-tight mb-2 group-hover:scale-105 transition-transform duration-500 origin-left">{metric.value}</div>
              {metric.change && (
                <div className="flex items-center gap-1.5">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${metric.change.startsWith("+")
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "bg-muted text-muted-foreground"
                    }`}>
                    {metric.change}
                  </span>
                  <span className="text-[10px] font-medium text-muted-foreground/70 tracking-tight">vs last month</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {/* Row 2: Large Chart (3 cols) & Quick Actions (1 col) */}
        <Card className="lg:col-span-3 lg:row-span-2 border-border/50 bg-card/40 backdrop-blur-md rounded-[2.5rem] overflow-hidden group">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 pb-6 px-8 pt-8">
            <div>
              <CardTitle className="text-xl font-black tracking-tight">{t("authority-compliance-rate-by-welayat-region")}</CardTitle>
              <CardDescription className="text-xs font-medium text-muted-foreground mt-1">
                Regional performance and registration efficiency metrics
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 bg-muted/30 p-1 rounded-xl">
              <button className="px-3 py-1.5 text-[10px] font-bold rounded-lg bg-background shadow-sm text-primary">Monthly</button>
              <button className="px-3 py-1.5 text-[10px] font-bold rounded-lg text-muted-foreground hover:text-foreground">Quarterly</button>
            </div>
          </CardHeader>
          <CardContent className="p-8 h-[400px]">
            <ChartAreaInteractive />
          </CardContent>
        </Card>

        {/* Assets Breakdown (1 col) */}
        <Card className="lg:col-span-1 lg:row-span-2 border-border/50 bg-card/60 backdrop-blur-md rounded-[2.5rem] overflow-hidden">
          <CardHeader className="px-8 pt-8 pb-4">
            <CardTitle className="text-xl font-black tracking-tight">Classification</CardTitle>
            <CardDescription className="text-xs font-medium">Distribution by usage</CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <div className="space-y-6">
              {TYPE_DATA.map((item) => (
                <div key={item.type} className="group flex flex-col gap-2">
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl transition-all duration-500 shadow-sm ${item.type === "Warehouse" ? "bg-amber-100 dark:bg-amber-900/30 text-amber-600" :
                        item.type === "Factory" ? "bg-rose-100 dark:bg-rose-900/30 text-rose-600" :
                          item.type === "Market" ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600" :
                            item.type === "Office" ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600" :
                              "bg-violet-100 dark:bg-violet-900/30 text-violet-600"
                        }`}>
                        {item.type === "Warehouse" && <Truck className="size-4" />}
                        {item.type === "Factory" && <Factory className="size-4" />}
                        {item.type === "Market" && <MapPin className="size-4" />}
                        {item.type === "Office" && <Building2 className="size-4" />}
                        {item.type === "Residential" && <CheckCircle className="size-4" />}
                      </div>
                      <span className="font-bold text-sm tracking-tight text-foreground/80">{item.type}</span>
                    </div>
                    <span className="font-black text-xs tabular-nums text-foreground">{item.count}</span>
                  </div>
                  <div className="h-2 w-full bg-muted/40 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(0,0,0,0.1)] ${item.type === "Warehouse" ? "bg-amber-500" :
                        item.type === "Factory" ? "bg-rose-500" :
                          item.type === "Market" ? "bg-emerald-500" :
                            item.type === "Office" ? "bg-indigo-500" :
                              "bg-violet-500"
                        }`}
                      style={{ width: `${(item.count / 600) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-border/50">
              <button className="w-full py-4 rounded-2xl bg-primary text-primary-foreground text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all">
                Generate Full Report
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Row 3: Regional Table (Full Width) */}
        <Card className="lg:col-span-4 border-border/50 bg-card/30 backdrop-blur-md rounded-[2.5rem] overflow-hidden">
          <CardHeader className="px-8 pt-8 pb-4 border-b border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-black tracking-tight">{t("regional-land-and-asset-summary")}</CardTitle>
                <CardDescription className="text-xs font-medium">Real-time data synchronization with central registry</CardDescription>
              </div>
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="size-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-bold">U{i}</div>
                ))}
                <div className="size-8 rounded-full border-2 border-background bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">+12</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted/20 text-muted-foreground/60 text-[10px] font-black uppercase tracking-widest">
                    <th className="px-8 py-5">{t("region")}</th>
                    <th className="px-8 py-5">{t("buildings")}</th>
                    <th className="px-8 py-5">{t("area")} (km²)</th>
                    <th className="px-8 py-5">Compliance Index</th>
                    <th className="px-8 py-5 text-right">Synchronization</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {REGIONAL_DATA.map((item) => (
                    <tr key={item.region} className="hover:bg-primary/[0.02] transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-xl bg-muted/30 flex items-center justify-center font-black text-xs text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                            {item.region.charAt(0)}
                          </div>
                          <span className="font-bold text-sm text-foreground">{item.region}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-black text-foreground">{item.totalBuildings}</span>
                          <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-50">units</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm tabular-nums font-semibold text-muted-foreground">
                        {item.totalAreaSqKm.toLocaleString()}
                      </td>
                      <td className="px-8 py-5">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background border border-border/50 shadow-sm">
                          <div className={`h-1.5 w-1.5 rounded-full ${item.complianceRate > 90 ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : item.complianceRate > 80 ? "bg-amber-500" : "bg-rose-500"}`} />
                          <span className="text-xs font-black tabular-nums">{item.complianceRate}%</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center justify-end gap-4">
                          <div className="w-32 h-2 bg-muted/40 rounded-full overflow-hidden shadow-inner">
                            <div
                              className="h-full bg-primary transition-all duration-1000 shadow-[0_0_10px_rgba(var(--primary),0.3)]"
                              style={{ width: `${item.complianceRate}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-black text-muted-foreground/40 group-hover:text-primary/60 transition-colors uppercase">98% Sync</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex w-full items-center justify-center text-center">
        <p className="text-center">

        Derwaýys ulgamy HK. Ähli hukuklary goralan
        </p>
      </div>
    </div>
  );
}
