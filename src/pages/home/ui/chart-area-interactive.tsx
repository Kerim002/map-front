"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "@/entities/home/api/dashboard.api";
import { useTranslation } from "react-i18next";

// Improved Config for Dark Blue Themes


export function ChartAreaInteractive() {
  const { t ,i18n} = useTranslation()
  // 1. Fetching real data
  const { data, isLoading } = useQuery(dashboardApi.getLocationsChart());


  // 2. Handle loading state
  if (isLoading) return <div className="h-[320px] w-full flex items-center justify-center">Loading...</div>;

  const chartConfig = {
    count: {
      label: t("registered"), // This pulls from your JSON files
      color: "hsl(var(--primary))",
    },
  } satisfies ChartConfig
  // Map the API data (converting string counts to numbers)
  const chartData = data?.data.map((item) => ({
    date: item.date,
    count: Number(item.count),
  })) || [];

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[320px] w-full"
    >
      <AreaChart data={chartData} margin={{ left: -20, right: 10, top: 10, bottom: 0 }}>
        <defs>
          {/* Enhanced Glow Effect for Dark Mode */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <linearGradient id="fillCount" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-count)"
              stopOpacity={0.4}
            />
            <stop
              offset="95%"
              stopColor="var(--color-count)"
              stopOpacity={0.05}
            />
          </linearGradient>
        </defs>

        {/* 3. Grid Visibility: Lighten the lines for dark blue backgrounds */}
        <CartesianGrid
          vertical={false}
          stroke="hsl(var(--border))"
          strokeOpacity={0.2}
        />

        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={15}
          minTickGap={32}
          tickFormatter={(value) => {
            const date = new Date(value);
            // FIXED: Using i18n.language for automatic month translation
            return date.toLocaleDateString(i18n.language, {
              month: "short",
              day: "numeric",
            });
          }}
          className="text-[10px] font-medium text-muted-foreground uppercase"
        />

        <ChartTooltip
          cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '4 4' }}
          content={
            <ChartTooltipContent
              labelFormatter={(value) => {
                const date = new Date(value);
                // FIXED: Localized long date for the tooltip header
                return date.toLocaleDateString(i18n.language, {
                  month: "long",
                  day: "numeric",
                  year: "numeric"
                });
              }}
              indicator="line"
              className="rounded-xl border-border/40 bg-background/95 backdrop-blur-md shadow-xl"
            />
          }
        />

        <Area
          dataKey="count"
          type="monotone"
          // fill="url(#fillCount)"
          // stroke="hsl(var(--primary))"
          strokeWidth={3}
        />
      </AreaChart>
    </ChartContainer>
  );
}