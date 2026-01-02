"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/ui/chart";

export const description = "An interactive area chart";

const chartData = [
  { date: "2024-04-01", registered: 120, target: 150 },
  { date: "2024-04-05", registered: 180, target: 170 },
  { date: "2024-04-10", registered: 160, target: 190 },
  { date: "2024-04-15", registered: 240, target: 210 },
  { date: "2024-04-20", registered: 310, target: 240 },
  { date: "2024-04-25", registered: 280, target: 270 },
  { date: "2024-04-30", registered: 350, target: 300 },
  { date: "2024-05-05", registered: 320, target: 330 },
  { date: "2024-05-10", registered: 410, target: 360 },
  { date: "2024-05-15", registered: 390, target: 390 },
  { date: "2024-05-20", registered: 450, target: 420 },
  { date: "2024-05-25", registered: 480, target: 450 },
  { date: "2024-05-30", registered: 520, target: 480 },
  { date: "2024-06-05", registered: 490, target: 510 },
  { date: "2024-06-10", registered: 560, target: 540 },
  { date: "2024-06-15", registered: 540, target: 570 },
  { date: "2024-06-20", registered: 610, target: 600 },
  { date: "2024-06-25", registered: 650, target: 630 },
  { date: "2024-06-30", registered: 680, target: 660 },
];

const chartConfig = {
  registered: {
    label: "Registered",
    color: "hsl(var(--primary))",
  },
  target: {
    label: "Target Goal",
    color: "hsl(var(--muted-foreground))",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[320px] w-full"
    >
      <AreaChart data={chartData} margin={{ left: -20, right: 10, top: 10, bottom: 0 }}>
        <defs>
          <filter id="shadow" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="0" dy="10" result="offsetblur" />
            <feFlood floodColor="black" floodOpacity="0.2" />
            <feComposite in2="offsetblur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="fillRegistered" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-registered)"
              stopOpacity={0.3}
            />
            <stop
              offset="95%"
              stopColor="var(--color-registered)"
              stopOpacity={0.0}
            />
          </linearGradient>
          <linearGradient id="fillTarget" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-target)"
              stopOpacity={0.1}
            />
            <stop
              offset="95%"
              stopColor="var(--color-target)"
              stopOpacity={0.0}
            />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 3" strokeOpacity={0.1} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={15}
          minTickGap={32}
          tickFormatter={(value) => {
            const date = new Date(value);
            return date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });
          }}
          className="text-[10px] font-bold text-muted-foreground/50 uppercase"
        />
        <ChartTooltip
          cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '4 4' }}
          content={
            <ChartTooltipContent
              labelFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric"
                });
              }}
              indicator="line"
              className="rounded-2xl border-border/50 bg-background/80 backdrop-blur-xl shadow-2xl"
            />
          }
        />
        <Area
          dataKey="target"
          type="monotone"
          fill="url(#fillTarget)"
          stroke="var(--color-target)"
          strokeWidth={2}
          strokeDasharray="5 5"
          opacity={0.5}
        />
        <Area
          dataKey="registered"
          type="monotone"
          fill="url(#fillRegistered)"
          stroke="var(--color-registered)"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          animationDuration={2000}
        />
      </AreaChart>
    </ChartContainer>
  );
}
