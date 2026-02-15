import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { employeeApi } from "@/entities/employee/api/employee.api";

import { Skeleton } from "@/shared/ui/skeleton";
import { useTranslation } from "react-i18next";
import { EmployeeInfoSection } from "@/widgets/employee/ui/employee-info-section";
import { EmployeeFolderExplorer } from "@/widgets/employee/ui/employee-folder-explorer";
import { FacilityPageHeader } from "@/widgets/facility/ui/facility-page-header";

export const EmployeeDetailPage = () => {
    const { employeeId } = useParams();
    const { t } = useTranslation();
    const { data: employee, isLoading, isError } = useQuery(employeeApi.detail(employeeId));

    if (isLoading) {
        return (
            <div className="p-10 space-y-10 animate-pulse">
                <Skeleton className="h-[300px] w-full rounded-[3rem]" />
                <Skeleton className="h-[500px] w-full rounded-[3rem]" />
            </div>
        );
    }

    if (isError || !employee) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
                <div className="p-6 rounded-full bg-destructive/10 text-destructive">
                    <span className="text-4xl font-black">!</span>
                </div>
                <p className="text-xl font-black uppercase tracking-tighter">{t("worker-not-found")}</p>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-10 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-[1600px] mx-auto">
            <FacilityPageHeader />
            <EmployeeInfoSection employee={employee} />
            <EmployeeFolderExplorer employee={employee} />
        </div>
    );
};
