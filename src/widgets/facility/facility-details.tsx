import { facilityApi } from "@/entities/facility/api/facility.api";
import { useDeleteFacility } from "@/features/facility/hook/use-delete-facility";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/shared/ui/alert-dialog";
import { Button } from "@/shared/ui/button";
import { useQuery } from "@tanstack/react-query";
import {
    Building2,
    Car,
    FireExtinguisherIcon,
    MapPin,
    ShieldCheck,
    BarChart3,
    Fingerprint,
    Briefcase,
    FileWarning,
    Eye,
    Key,
    Network,
    FolderUp,
    Calendar,
    Clock,
    StickyNote
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

// Helper to format dates
const formatDate = (dateString?: string | null) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString();
};

export const FacilityDetails = ({ filter }: { filter?: "main" | "extra" }) => {
    const { t } = useTranslation();
    const { facilityId, facilityChildId } = useParams();
    const { data } = useQuery(facilityApi.detail(facilityChildId ? facilityChildId : facilityId));
    const { mutate } = useDeleteFacility();
    const navigate = useNavigate();

    const handleDelete = () => {
        mutate(facilityId ?? "", {
            onSuccess: () => {
                navigate("/map");
            },
        });
    };

    // Helper to render boolean states safely
    const renderBoolean = (val?: boolean | null) => {
        if (val === undefined || val === null) return null;
        return val ? t("yes") : t("no");
    };

    const renderItem = (icon: React.ReactNode, label: string, value: string | number | null | undefined, colorClass: string) => {
        if (value === null || value === undefined || value === "") return null;
        return (
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 p-4 rounded-2xl bg-muted/30 border border-border/50 group/row hover:bg-muted/50 transition-all duration-300 h-full">
                <div className="flex items-center gap-3 shrink-0">
                    <div className={`p-2 rounded-xl ${colorClass} group-hover/row:scale-110 transition-transform duration-300`}>
                        {icon}
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-muted-foreground/60">{t(label)}</span>
                </div>
                <span className="text-sm font-black text-foreground sm:text-right break-words line-clamp-2 sm:line-clamp-3">
                    {value}
                </span>
            </div>
        );
    };

    if (filter === "extra") {
        return (
            <div className="grid grid-cols-1 gap-4">
                {renderItem(<Fingerprint className="h-4 w-4" />, "id", data?.cadaster, "bg-primary/10 text-primary")}
                {renderItem(<div className="size-4 flex items-center justify-center font-bold text-[10px]">m²</div>, "total-area", data?.area ? `${data.area}m²` : null, "bg-blue-500/10 text-blue-500")}
                {renderItem(<Building2 className="h-4 w-4" />, "floor", data?.floor, "bg-violet-500/10 text-violet-500")}
                {renderItem(<Car className="h-4 w-4" />, "parking", data?.parking, "bg-emerald-500/10 text-emerald-500")}

                {/* Newly Added Extra Items */}
                {renderItem(<Eye className="h-4 w-4" />, "in-map", data?.visibility !== undefined ? (data.visibility ? t("visible") : t("hidden")) : null, "bg-teal-500/10 text-teal-500")}
                {renderItem(<Key className="h-4 w-4" />, "rental", renderBoolean(data?.rental), "bg-yellow-500/10 text-yellow-500")}
                {renderItem(<Network className="h-4 w-4" />, "has-sub-facilities", renderBoolean(data?.hasChildren), "bg-purple-500/10 text-purple-500")}
                {renderItem(<FolderUp className="h-4 w-4" />, "parent-facility", data?.parent?.name, "bg-slate-500/10 text-slate-500")}
                {renderItem(<Calendar className="h-4 w-4" />, "created-at", formatDate(data?.createdAt), "bg-zinc-500/10 text-zinc-500")}
                {renderItem(<Clock className="h-4 w-4" />, "updated-at", formatDate(data?.updatedAt), "bg-stone-500/10 text-stone-500")}
            </div>
        );
    }

    return (
        <div className="space-y-2 h-full flex flex-col">
            <div className="space-y-8 flex-1">
                <div className="space-y-2">
                    <h2 className="text-3xl font-black tracking-tight text-foreground">
                        {data?.name}
                    </h2>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground/60 text-sm font-semibold italic">
                        <div className="flex items-center gap-2">
                            <span className="not-italic text-foreground/80">{data?.region?.type}</span>
                        </div>
                        {
                            data?.city?.type &&

                            <div className="flex items-center gap-2">
                                <span className="text-border">/</span>
                                <MapPin className="h-4 w-4 text-primary" />
                                <span className="not-italic text-foreground/80">{data?.city.type}</span>
                            </div>
                        }

                        {
                            data?.district?.type &&
                            <div className="flex items-center gap-2">
                                <span className="text-border">/</span>

                                <MapPin className="h-4 w-4 text-primary" />
                                <span className="not-italic text-foreground/80">{data?.district.type}</span>
                            </div>
                        }

                        {
                            data?.address &&


                            <div className="flex items-center gap-2">
                                <span className="text-border">/</span>

                                <MapPin className="h-4 w-4 text-primary" />
                                <span className="not-italic text-foreground/80">{data?.address}</span>
                            </div>
                        }

                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    {/* Core Attributes */}
                    <div className="grid grid-cols-1 gap-4">
                        {renderItem(<Briefcase className="h-4 w-4" />, "specialization", data?.specialization?.type, "bg-fuchsia-500/10 text-fuchsia-500")}
                        {renderItem(<Building2 className="h-4 w-4" />, "building", data?.building?.type, "bg-indigo-500/10 text-indigo-500")}
                        {renderItem(<ShieldCheck className="h-4 w-4" />, "authority", data?.authority?.type, "bg-amber-500/10 text-amber-500")}
                        {/* {renderItem(<Landmark className="h-4 w-4" />, "ownership", data?.ownership?.type, "bg-rose-500/10 text-rose-500")} */}
                        {renderItem(<BarChart3 className="h-4 w-4" />, "performance", data?.performance?.type, "bg-cyan-500/10 text-cyan-500")}
                        {!filter && renderItem(<Fingerprint className="h-4 w-4" />, "id", data?.cadaster, "bg-primary/10 text-primary")}
                        {renderItem(<FireExtinguisherIcon className="h-4 w-4" />, "fire-inspection-at", formatDate(data?.fireInspectionAt), "bg-orange-500/10 text-orange-500")}
                        {renderItem(<FileWarning className="h-4 w-4" />, "license-expired-at", formatDate(data?.licenseExpiredAt), "bg-red-500/10 text-red-500")}
                    </div>

                    {/* Dedicated Note Section */}
                    {data?.note && (
                        <div className="p-5 rounded-2xl bg-muted/30 border border-border/50 space-y-3 mt-2">
                            <div className="flex items-center gap-3 text-muted-foreground/60">
                                <div className="p-2 rounded-xl bg-lime-500/10 text-lime-500">
                                    <StickyNote className="h-4 w-4" />
                                </div>
                                <span className="text-xs font-black uppercase tracking-widest">{t("note")}</span>
                            </div>
                            <p className="text-sm font-medium text-foreground leading-relaxed whitespace-pre-wrap">
                                {data.note}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full h-12 rounded-xl font-black uppercase tracking-widest text-xs shadow-lg shadow-destructive/20 hover:shadow-destructive/40 transition-all mt-6 shrink-0">
                        {t("delete-facility")}
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-[2rem] border-0 bg-card/95 backdrop-blur-xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-2xl font-black tracking-tight">{t("delete-facility-title")}</AlertDialogTitle>
                        <AlertDialogDescription className="font-medium text-muted-foreground/80">
                            {t("delete-facility-description")}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="gap-3 mt-6">
                        <AlertDialogCancel className="rounded-xl font-black uppercase tracking-widest text-[11px] border-border/50">{t("cancel")}</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl font-black uppercase tracking-widest text-[11px]"
                        >
                            {t("confirm-delete")}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};