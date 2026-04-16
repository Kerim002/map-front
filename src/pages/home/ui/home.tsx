import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { ChartAreaInteractive } from "./chart-area-interactive";
import { useTranslation } from "react-i18next";
import { DashboardCards } from "@/widgets/home/dashboard-cards";
import { LocationCategoryChart } from "./locations-category-chart";
import { StoragePieChart } from "./storage-pie-bar";

export function Home() {


  // const totalCompliance = REGIONAL_DATA.reduce(
  //   (sum, item) => sum + item.complianceRate,
  //   0
  // );
  // const averageCompliance = (totalCompliance / REGIONAL_DATA.length).toFixed(1);
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


      </div>

      {/* BENTO GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">

        {/* Row 1: Key Metrics (4 cols) */}

        <div className="grid col-span-1 md:col-span-2 lg:col-span-4 grid-cols-3 gap-6">

          <DashboardCards />
        </div>

        {/* Row 2: Large Chart (3 cols) & Quick Actions (1 col) */}
        <Card className="lg:col-span-3 border-border/50 bg-card/40 backdrop-blur-md rounded-[2.5rem] overflow-hidden group">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 pb-6 px-8 pt-8">
            <div>
              <CardTitle className="text-xl font-black tracking-tight">
                {t("location-creation-analytics")}
              </CardTitle>

            </div>

          </CardHeader>
          <CardContent className="">
            <ChartAreaInteractive />
          </CardContent>
        </Card>
        <StoragePieChart />
        <LocationCategoryChart />

        
      </div>
      <div className="flex w-full items-center justify-center text-center">
        <p className="text-center">

          Derwaýys ulgamy HK. Ähli hukuklary goralan
        </p>
      </div>
    </div>
  );
}
