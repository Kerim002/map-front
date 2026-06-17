import { type ElementType } from "react";
import { 
    MapPin, Users, Package, Building2, Map, 
     ShieldCheck, Key, Gauge, Maximize, 
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "@/entities/home/api/dashboard.api";


export interface KeyMetric {
    title: string;
    value: string;
    change?: string;
    icon: ElementType;
}
export const DashboardCards = () => {
    const { t } = useTranslation();
    const { data, isLoading } = useQuery(dashboardApi.getOverview());
    console.log(data)
    // Map your API response to the display metrics
const metrics: KeyMetric[] = [
    { title: "total-regions", value: data?.totalRegions, icon: Map },
    { title: "total-locations", value: data?.totalLocations, icon: MapPin },
    { title: "total-buildings", value: data?.totalBuildings, icon: Building2 },
    { title: "total-area-sqm", value: data?.totalAreaSqm, icon: Maximize },
    { title: "total-employees", value: data?.totalEmployees, icon: Users },
    { title: "total-authorities", value: data?.totalAuthorities, icon: ShieldCheck },
    { title: "total-ownerships", value: data?.totalOwnerships, icon: Key },
    { title: "total-performances", value: data?.totalPerformances, icon: Gauge },
    { title: "total-items", value: data?.totalItems, icon: Package },
].map(m => ({ ...m, value: m.value?.toLocaleString() ?? "0" }));

    if (isLoading) return <div>Loading...</div>; // Or a skeleton loader

    return (
        <>
            {metrics.map((metric, idx) => (
                <Card
                    key={metric.title}
                    className={`group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 rounded-3xl ${
                        idx === 0 ? "lg:col-span-1" : ""
                    }`}
                >
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <metric.icon className="size-24 -mr-8 -mt-8" />
                    </div>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div className="p-2.5 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                            <metric.icon className="h-5 w-5" />
                        </div>
                        <span className="font-bold uppercase tracking-widest text-muted-foreground">
                            {t(metric.title)}
                        </span>
                    </CardHeader>
                    <CardContent className="pt-2">
                        <div className="text-3xl font-black tracking-tight mb-2 group-hover:scale-105 transition-transform duration-500 origin-left">
                            {metric.value}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </>
    );
};