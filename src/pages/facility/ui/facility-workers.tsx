import { employeeApi } from "@/entities/employee/api/employee.api";

import useQueryParam from "@/shared/hooks/use-query-param";
import { storageUrlCreate } from "@/shared/lib/storage-url-create";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/shared/ui/pagination";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Users, Map as MapIcon, Layers, ChevronRight, Phone, Upload } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

export const FacilityWorkers = () => {
    const { t } = useTranslation();
    const { facilityId, facilityChildId } = useParams();
    const { setQuery } = useQueryParam();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [page, setPage] = useState(1);
    const limit = 6;

    const { data: workersData } = useQuery(
        employeeApi.list({
            limit,
            page,
            location_id: facilityChildId ? facilityChildId : facilityId ?? ""
        })
    );
    const totalPages = workersData?.pageInfo.totalPages ?? 0;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            <div className="lg:col-span-8 flex flex-col">
                <Card className="border-border/50 bg-card/60 backdrop-blur-md rounded-[2.5rem] border-0 shadow-2xl shadow-primary/5 flex flex-col h-full">
                    <CardHeader className="px-6 pt-6 pb-6 flex flex-row items-center justify-between">
                        <div className="space-y-1">
                            <CardTitle className="text-2xl font-black tracking-tight flex items-center gap-3">
                                <Users className="h-6 w-6 text-primary" />
                                {t("associated-personnel")}
                            </CardTitle>
                            <p className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest">
                                {t("managing-team-members")}
                            </p>
                        </div>

                        {/* Pagination on the right */}
                        <div className="shrink-0 scale-90 -mr-4">
                            {totalPages > 1 && (
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious
                                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                                className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                            />
                                        </PaginationItem>
                                        <div className="hidden sm:flex items-center gap-1">
                                            {Array.from({ length: totalPages }).map((_, i) => (
                                                <PaginationItem key={i}>
                                                    <PaginationLink
                                                        onClick={() => setPage(i + 1)}
                                                        isActive={page === i + 1}
                                                        className="cursor-pointer rounded-xl font-black h-8 w-8 text-xs"
                                                    >
                                                        {i + 1}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            ))}
                                        </div>
                                        <PaginationItem>
                                            <PaginationNext
                                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                                className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                            />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="px-6 pb-6 flex flex-col flex-1">
                        {/* <PhotoProvider> */}
                        <div className="space-y-3 min-h-[552px] flex-1">
                            {workersData?.data.map((worker) => (
                                <div
                                    key={worker.id}
                                    className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-all duration-300 group"
                                >
                                    <div className="flex items-center gap-4">
                                        {/* <PhotoView src={storageUrlCreate("user", worker.avatarUrl ?? "", "xmd")}>
                                                <Avatar className="h-12 w-12 cursor-pointer hover:ring-4 ring-primary/20 transition-all duration-300 ring-offset-background ring-offset-2">
                                                    <AvatarImage
                                                        className="object-cover"
                                                        src={storageUrlCreate("user", worker.avatarUrl ?? "", "sm")}
                                                        alt={worker.firstName}
                                                    />
                                                    <AvatarFallback className="bg-primary/10 text-primary font-black">
                                                        {worker.firstName.charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>
                                            </PhotoView> */}

                                        <PhotoProvider
                                            overlayRender={() => (
                                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-1 rounded-md text-sm">
                                                    {worker.firstName} {worker.lastName}
                                                </div>
                                            )}
                                        >
                                            <PhotoView  src={storageUrlCreate("user", worker.avatarUrl ?? "", "xmd")}>
                                                <Avatar className="h-12 w-12 cursor-pointer hover:ring-4 ring-primary/20 transition-all duration-300 ring-offset-background ring-offset-2">
                                                    <AvatarImage
                                                        className="object-cover "
                                                        // src={imageUrl}
                                                         src={storageUrlCreate("user", worker.avatarUrl ?? "", "sm")}
                                                        // alt={fullName}
                                                    />
                                                    <AvatarFallback className="rounded-sm">
                                                        {worker.firstName.charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>
                                            </PhotoView>
                                        </PhotoProvider>

                                        <div className="space-y-0.5">
                                            <div className="flex items-center gap-2">
                                                <span className="font-black text-sm text-foreground">
                                                    {worker.firstName} {worker.lastName}
                                                </span>
                                            </div>
                                            <p className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-wider">
                                                {worker.position}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        {worker.phone && (
                                            <div className="hidden sm:flex items-center gap-2 text-muted-foreground/60">
                                                <Phone className="h-3 w-3" />
                                                <span className="text-xs font-bold tabular-nums">{worker.phone}</span>
                                            </div>
                                        )}
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="rounded-xl hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                                            onClick={() => navigate(`employees/${worker.id}`)}
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            {(!workersData?.data || workersData.data.length === 0) && (
                                <div className="flex-1 flex items-center justify-center border-2 border-dashed border-border/30 rounded-3xl min-h-[400px]">
                                    <div className="text-center space-y-2">
                                        <Users className="h-8 w-8 text-muted-foreground/30 mx-auto" />
                                        <p className="text-sm font-bold text-muted-foreground/40 uppercase tracking-widest">
                                            {t("no-data-found")}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* </PhotoProvider> */}

                        <Button
                            onClick={() => navigate("employee/1")}
                            variant="outline"
                            className="w-full mt-6 h-12 rounded-xl font-black uppercase tracking-widest text-[11px] border-border/50 hover:bg-muted/50 transition-all shadow-sm"
                        >
                            {t("manage-personnel")}
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Actions Sidebar Section */}
            <div className="lg:col-span-4 flex flex-col">
                <Card className="border-border/50 bg-card/60 gap-3 backdrop-blur-md rounded-[2.5rem] border-0 shadow-2xl shadow-primary/5 p-5 flex flex-col h-full">
                    <div className="space-y-2 mb-4">
                        <h3 className="text-lg font-black tracking-tight">{t("quick-actions")}</h3>
                        <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-[0.1em]">
                            {t("manage-facility-operations")}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {!pathname.includes("/childs") && !pathname.includes("/rentals") && (
                            <>
                                <QuickActionButton
                                    icon={Layers}
                                    label={t("facilities")}
                                    onClick={() => navigate("childs/1")}
                                    colorClass="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
                                />
                                <QuickActionButton
                                    icon={Layers}
                                    label={t("rental")}
                                    onClick={() => navigate("rentals/1")}
                                    colorClass="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
                                />
                            </>
                        )}

                        <QuickActionButton
                            icon={MapPin}
                            label={t("edit-location")}
                            onClick={() => setQuery([{ key: "location-id", value: facilityChildId ? facilityChildId : facilityId }])}
                            colorClass="bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white"
                        />

                        <QuickActionButton
                            icon={Upload}
                            label={t("upload-new-document")}
                            onClick={() => navigate("files/1")}
                            colorClass="bg-white/20 text-white"
                            className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
                        />
                        {/* <div className="col-span-2"> */}
                        <QuickActionButton
                            icon={MapIcon}
                            label={t("view-on-map")}
                            onClick={() => navigate("/map")}
                            variant="default"
                            colorClass="bg-white/20 text-white"
                            className="!bg-primary !text-primary-foreground shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1"
                        />

                        {/* </div> */}
                    </div>
                </Card>
            </div>
        </div>
    );
};

const QuickActionButton = ({ icon: Icon, label, onClick, variant = "outline", colorClass, className }: any) => (
    <Button
        variant={variant}
        onClick={onClick}
        className={`h-28 w-full flex flex-col items-center justify-center gap-3 rounded-3xl border-border/50 hover:bg-primary/5 transition-all duration-300 group shadow-lg shadow-black/5 p-4 ${className}`}
    >
        <div className={`p-3 rounded-2xl ${colorClass} transition-all duration-300 group-hover:scale-110 shadow-sm`}>
            <Icon className="h-6 w-6" />
        </div>
        <span className="font-black uppercase !break-words-all whitespace-pre-wrap tracking-widest text-[10px] text-center leading-tight">
            {label}
        </span>
    </Button>
);
