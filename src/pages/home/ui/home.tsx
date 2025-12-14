import React from "react";
import {
  Building2,
  AreaChart,
  MapPin,
  CheckCircle,
  Truck,
  Factory,
  LayoutGrid,
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
import { Separator } from "@/shared/ui/separator";
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
  icon: React.ElementType;
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

interface ChartProps {
  data: any[];
  title: string;
  description: string;
  type: "bar" | "area";
}

const ChartPlaceholder: React.FC<ChartProps> = ({ title, description }) => {
  const { t } = useTranslation();
  return (
    <Card className="bg-white dark:bg-slate-800 h-full">
      <CardHeader>
        <CardTitle>{t(title)}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <ChartAreaInteractive />
    </Card>
  );
};

// --- MAIN DASHBOARD COMPONENT ---

export function Home() {
  // Calculate total compliance and average
  const totalCompliance = REGIONAL_DATA.reduce(
    (sum, item) => sum + item.complianceRate,
    0
  );
  const averageCompliance = (totalCompliance / REGIONAL_DATA.length).toFixed(1);
  const { t } = useTranslation();

  return (
    <div className="pt-20 p-10 space-y-8 bg-background ">
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-50 flex items-center gap-3">
        <LayoutGrid className="h-8 w-8 text-blue-600" />
        {t("turkmenistan-cadastre-dashboard")}
      </h1>
      <Separator />

      {/* 1. KEY METRIC CARDS */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {METRICS.map((metric) => (
          <Card key={metric.title} className="bg-white dark:bg-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                {t(metric.title)}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{metric.value}</div>
              {metric.change && (
                <p
                  className={`text-xs ${
                    metric.change.startsWith("+")
                      ? "text-green-600"
                      : "text-slate-500"
                  }`}
                >
                  {metric.change}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 2. CHARTS SECTION (Area & Bar Charts) */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* CHART 1: Compliance Rate by Region (Bar Chart) */}
        <div className="lg:col-span-2">
          <ChartPlaceholder
            data={REGIONAL_DATA}
            title="authority-compliance-rate-by-welayat-region"
            description={`${t("average-compliance")}: ${averageCompliance}%`}
            type="bar"
          />
        </div>

        {/* CHART 2: Building Type Distribution (Pie/Donut Chart Placeholder) */}
        <Card className="bg-white dark:bg-slate-800">
          <CardHeader>
            <CardTitle>Building Type Distribution</CardTitle>
            <CardDescription>
              Total count of assets by classification.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            {TYPE_DATA.map((item) => (
              <div
                key={item.type}
                className="flex justify-between items-center text-sm"
              >
                <div className="flex items-center gap-2">
                  {item.type === "Warehouse" && (
                    <Truck className="h-4 w-4 text-orange-500" />
                  )}
                  {item.type === "Factory" && (
                    <Factory className="h-4 w-4 text-red-500" />
                  )}
                  {item.type === "Market" && (
                    <MapPin className="h-4 w-4 text-green-500" />
                  )}
                  {item.type === "Office" && (
                    <Building2 className="h-4 w-4 text-blue-500" />
                  )}
                  {item.type === "Residential" && (
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                  )}
                  <span>{item.type}</span>
                </div>
                <span className="font-semibold">{item.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* 3. REGIONAL BREAKDOWN TABLE/LIST (Area Bars) */}
      <Card className="bg-white dark:bg-slate-800">
        <CardHeader>
          <CardTitle>{t("regional-land-and-asset-summary")}</CardTitle>
          <CardDescription>
            {t(
              "overview-of-registered-buildings-and-area-by-administrative-region-welayat"
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {REGIONAL_DATA.map((item) => (
            <div
              key={item.region}
              className="p-3 border rounded-lg dark:hover:bg-slate-700 transition-colors"
            >
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-semibold ">{item.region}</h3>
                <div className="flex gap-4 text-sm text-slate-600">
                  <span>
                    <span className="font-bold text-lg text-blue-600">
                      {item.totalBuildings}
                    </span>{" "}
                    {t("buildings")}
                  </span>
                </div>
              </div>

              {/* Area Bar (Visualizing area or building density) */}
              <div className="h-2 bg-slate-200 rounded-full mt-2">
                <div
                  className="h-2 bg-yellow-500 rounded-full"
                  style={{
                    width: `${Math.min(100, item.totalAreaSqKm / 1500)}%`,
                  }} // Scaled visualization
                  title={`Area: ${item.totalAreaSqKm.toLocaleString()} km²`}
                ></div>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {t("area")}: {item.totalAreaSqKm.toLocaleString()} km²
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
