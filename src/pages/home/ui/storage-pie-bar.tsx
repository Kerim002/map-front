"use client";

import * as React from "react";
import { Label, Pie, PieChart, Cell, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { dashboardApi } from "@/entities/home/api/dashboard.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { HardDrive } from "lucide-react";

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

// Utility to format bytes
const formatBytes = (bytes: number, decimals = 2) => {
    if (!bytes) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export function StoragePieChart() {
    const { t } = useTranslation();
    const { data, isLoading } = useQuery(dashboardApi.getStorage());

    const chartData = React.useMemo(() => {
        if (!data) return [];
        return [
            { name: t("files"), value: data.totalFiles },
            { name: t("folders"), value: data.totalFolders },
        ];
    }, [data, t]);

    if (isLoading) return <div className="h-[300px] flex items-center justify-center">Loading...</div>;

    return (
        <Card className="flex h-full col-span-1 flex-col border-border/50 bg-card/50 backdrop-blur-sm rounded-3xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-0">
                <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                    {t("storage-overview")}
                </CardTitle>
                <HardDrive className="size-5 text-primary opacity-50" />
            </CardHeader>

            <CardContent className="flex-1 pb-4">
                <div className="mx-auto aspect-square max-h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="name"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={8}
                                stroke="transparent"
                            >
                                {chartData.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                ))}
                                <Label
                                    content={({ viewBox }) => {
                                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                            return (
                                                <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                                    <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-xl font-black">
                                                        {formatBytes(data?.totalSizeBytes || 0)}
                                                    </tspan>
                                                    <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 20} className="fill-muted-foreground text-[10px] font-bold uppercase">
                                                        {t("total-size")}
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

                <div className="grid grid-cols-2 gap-4 mt-2">
                    {chartData.map((item, index) => (
                        <div key={item.name} className="flex flex-col items-center p-3 rounded-2xl bg-background/40 border border-border/50">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="size-2 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                                <span className="text-[10px] font-bold uppercase text-muted-foreground">{item.name}</span>
                            </div>
                            <span className="text-lg font-black">{item.value.toLocaleString()}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}