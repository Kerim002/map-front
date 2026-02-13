"use client";

import * as React from "react";
import { Label, Pie, PieChart, Cell, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { dashboardApi } from "@/entities/home/api/dashboard.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs";

// Expanded 12-color palette for high-density data
const COLORS = [
  "#2dd4bf", // Teal
  "#a855f7", // Purple
  "#f43f5e", // Rose
  "#eab308", // Yellow
  "#3b82f6", // Blue
  "#10b981", // Emerald
  "#f97316", // Orange
  "#6366f1", // Indigo
  "#ec4899", // Pink
  "#8b5cf6", // Violet
  "#06b6d4", // Cyan
];

export function LocationCategoryChart() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = React.useState("byRegion");

  const { data, isLoading } = useQuery(dashboardApi.getLocationsByCategory());

  const chartData = React.useMemo(() => {
    if (!data) return [];
    const currentData = data[activeTab as keyof typeof data] || [];
    // Sorting by count descending makes the chart and legend much easier to read
    return [...currentData].sort((a, b) => b.count - a.count);
  }, [data, activeTab]);

  const totalCount = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, [chartData]);

  if (isLoading) return <div className="h-[400px] flex items-center justify-center">Loading...</div>;

  return (
    <Card className="flex col-span-4 flex-col border-border/50 bg-card/50 backdrop-blur-sm rounded-3xl">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-lg font-bold uppercase tracking-wider text-muted-foreground/80">
          {t("locations-distribution")}
        </CardTitle>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
          <TabsList className="grid grid-cols-5 bg-background/50 rounded-xl h-11 p-1">
            <TabsTrigger value="byRegion" className="text-[10px] md:text-xs rounded-lg">{t("region")}</TabsTrigger>
            <TabsTrigger value="byBuilding" className="text-[10px] md:text-xs rounded-lg">{t("building")}</TabsTrigger>
            <TabsTrigger value="byAuthority" className="text-[10px] md:text-xs rounded-lg">{t("authority")}</TabsTrigger>
            <TabsTrigger value="byOwnership" className="text-[10px] md:text-xs rounded-lg">{t("ownership")}</TabsTrigger>
            <TabsTrigger value="byPerformance" className="text-[10px] md:text-xs rounded-lg">{t("performance")}</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      
      <CardContent className="flex-1 pb-0 flex flex-col md:flex-row items-center justify-around min-h-[350px]">
  <div className="flex flex-col items-center">
    {/* Chart Container */}
    <div className="relative h-[280px] w-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="count"
            nameKey="name"
            innerRadius={80}
            outerRadius={110}
            stroke="transparent"
            paddingAngle={2}
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="outline-none" />
            ))}
            
            {/* ONLY the number stays inside */}
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                      <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-4xl font-black">
                        {totalCount}
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>

    {/* Text moved to the bottom, outside the SVG */}
    <div className="mt-2">
      <span className="text-xs uppercase font-bold tracking-widest text-muted-foreground/60">
        {t("total-locations")}
      </span>
    </div>
  </div>

  {/* Scrollable Legend */}
  <div className="flex flex-col gap-3 w-full md:w-1/2 max-h-[300px] overflow-y-auto px-4 py-4 custom-scrollbar">
    {chartData.map((item, index) => (
      <div key={item.id} className="flex items-center justify-between group border-b border-border/10 pb-2 last:border-0">
        <div className="flex items-center gap-3">
          <div 
            className="size-2.5 rounded-full" 
            style={{ backgroundColor: COLORS[index % COLORS.length] }} 
          />
          <span className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors line-clamp-1">
            {item.name}
          </span>
        </div>
        <span className="text-sm font-black tabular-nums pl-4">{item.count}</span>
      </div>
    ))}
  </div>
</CardContent>
    </Card>
  );
}