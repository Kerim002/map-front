import { useTranslation } from "react-i18next";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { facilityApi } from "@/entities/facility/api/facility.api";
import { employeeApi } from "@/entities/employee/api/employee.api";
import { Breadcrumb, type BreadcrumbItem } from "@/shared/ui/breadcrumb";
import { Map, Landmark, Users, FileText } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { cn } from "@/shared/lib/utils";

// Helper function to truncate strings
const truncate = (str: string | undefined, length: number) => {
    if (!str) return "...";
    if (str.length <= length) return str;
    return str.slice(0, length) + "...";
};

interface FacilityPageHeaderProps {
    className?: string;
}

export const FacilityPageHeader = ({ className }: FacilityPageHeaderProps) => {
    const { t } = useTranslation();
    const { facilityId, facilityChildId, employeeId } = useParams();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    // Primary data for the current facility
    const currentId = facilityChildId || facilityId;
    const { data: currentFacility } = useQuery(facilityApi.detail(currentId));

    // For parent hierarchy
    const { data: parentFacility } = useQuery({
        ...facilityApi.detail(facilityId),
        enabled: !!facilityChildId
    });

    // Fetch employee data if we are on employee detail page
    const { data: employee } = useQuery(employeeApi.detail(employeeId));

    // Determine the current flow type: rentals vs childs
    const isRentalPath = pathname.includes("/rentals");
    const pathSegment = isRentalPath ? "rentals" : "childs";
    const subEntityLabel = isRentalPath ? t("rental") : t("sub-facilities");

    const isWorkersPage = pathname.includes("/employee") && !employeeId;
    const isFilesPage = pathname.includes("/files");
    const isSubListPage = (pathname.includes("/childs") || pathname.includes("/rentals")) && !facilityChildId;
    const isEmployeeDetailPage = !!employeeId;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            label: t("map"),
            href: "/map",
            icon: <Map className="size-3" />
        }
    ];

    // Build hierarchy
    if (facilityChildId && parentFacility) {
        // Map > Parent
        breadcrumbs.push({
            label: truncate(parentFacility.name, 17),
            href: `/map/${facilityId}`,
            icon: <Landmark className="size-3" />
        });

        // Map > Parent > Sub-facilities/Rentals
        breadcrumbs.push({
            label: subEntityLabel,
            href: `/map/${facilityId}/${pathSegment}/1`,
            icon: <Landmark className="size-3" />
        });

        const facilityHref = `/map/${facilityId}/${pathSegment}/1/${facilityChildId}`;

        if (isWorkersPage || isFilesPage || isEmployeeDetailPage) {
            breadcrumbs.push({
                label: truncate(currentFacility?.name, 17),
                href: facilityHref,
                icon: <Landmark className="size-3" />
            });
        } else {
            breadcrumbs.push({
                label: truncate(currentFacility?.name, 17),
                active: true,
                icon: <Landmark className="size-3" />
            });
        }
    } else if (currentFacility) {
        // Map > Parent (current is parent)
        const facilityHref = `/map/${facilityId}`;

        if (isWorkersPage || isFilesPage || isEmployeeDetailPage || isSubListPage) {
            breadcrumbs.push({
                label: truncate(currentFacility.name, 17),
                href: facilityHref,
                icon: <Landmark className="size-3" />
            });
        } else {
            breadcrumbs.push({
                label: truncate(currentFacility.name, 17),
                active: true,
                icon: <Landmark className="size-3" />
            });
        }
    }

    // Push the list page breadcrumb if we are viewing the list of childs or rentals
    if (isSubListPage) {
        breadcrumbs.push({
            label: subEntityLabel,
            active: true,
            icon: <Landmark className="size-3" />
        });
    }

    if (isWorkersPage || isEmployeeDetailPage) {
        const workersHref = facilityChildId
            ? `/map/${facilityId}/${pathSegment}/1/${facilityChildId}/employee/1`
            : `/map/${facilityId}/employee/1`;

        if (isEmployeeDetailPage) {
            breadcrumbs.push({
                label: t("workers"),
                href: workersHref,
                icon: <Users className="size-3" />
            });
            breadcrumbs.push({
                label: employee 
                    ? truncate(`${employee.firstName} ${employee.lastName}`, 17)
                    : "...",
                active: true,
                icon: <Users className="size-3" />
            });
        } else {
            breadcrumbs.push({
                label: t("workers"),
                active: true,
                icon: <Users className="size-3" />
            });
        }
    } else if (isFilesPage) {
        breadcrumbs.push({
            label: t("documents"),
            active: true,
            icon: <FileText className="size-3" />
        });
    }

    const currentTab = (isWorkersPage || isEmployeeDetailPage) ? "workers" : isFilesPage ? "files" : "overview";

    const handleTabChange = (value: string) => {
        // Build base path dynamically depending on whether it's childs or rentals
        const basePath = facilityChildId
            ? `/map/${facilityId}/${pathSegment}/1/${facilityChildId}`
            : `/map/${facilityId}`;

        if (value === "overview") navigate(basePath);
        if (value === "workers") navigate(`${basePath}/employee/1`);
        if (value === "files") navigate(`${basePath}/files/1`);
    };

    return (
        <div className={cn("space-y-6 animate-in fade-in slide-in-from-top-4 duration-700", className)}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <Breadcrumb items={breadcrumbs} />

                {!isSubListPage && (
                    <Tabs value={currentTab} onValueChange={handleTabChange}>
                        <TabsList className="bg-card/40 backdrop-blur-md border border-border/50 rounded-2xl h-11 p-1">
                            <TabsTrigger
                                value="overview"
                                className="rounded-xl px-4 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                            >
                                {t("overview")}
                            </TabsTrigger>
                            <TabsTrigger
                                value="workers"
                                className="rounded-xl px-4 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                            >
                                {t("workers")}
                            </TabsTrigger>
                            <TabsTrigger
                                value="files"
                                className="rounded-xl px-4 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                            >
                                {t("documents")}
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                )}
            </div>
        </div>
    );
};