import type { Employee } from "@/entities/employee/model/employee";
import { Card } from "@/shared/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { storageUrlCreate } from "@/shared/lib/storage-url-create";
import { Phone, Mail, Briefcase, MapPin, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

export const EmployeeInfoSection = ({ employee }: { employee: Employee }) => {
    const { t } = useTranslation();

    const renderInfoItem = (icon: any, label: string, value: string, color: string) => (
        <div className="flex items-center gap-4 p-5 rounded-[2rem] bg-muted/30 border border-border/50 hover:bg-muted/50 transition-all duration-300">
            <div className={`p-3 rounded-2xl ${color} shadow-sm group-hover:scale-110 transition-transform`}>
                {icon}
            </div>
            <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 leading-none mb-1">
                    {t(label)}
                </span>
                <span className="text-sm font-black text-foreground break-all leading-tight">
                    {value}
                </span>
            </div>
        </div>
    );

    return (
        <Card className="border-border/50 bg-card/60 backdrop-blur-md rounded-[3rem] border-0 shadow-2xl shadow-primary/5 p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />

            <div className="flex flex-col lg:flex-row gap-12 items-start relative z-10">
                <div className="shrink-0 mx-auto lg:mx-0">
                    <Avatar className="h-48 w-48 rounded-[2.5rem] shadow-2xl ring-4 ring-primary/10 ring-offset-background ring-offset-8 transition-transform duration-500 group-hover:rotate-2 group-hover:scale-105">
                        <AvatarImage
                            className="object-cover"
                            src={storageUrlCreate("user", employee.avatarUrl ?? "", "md")}
                        />
                        <AvatarFallback className="text-5xl font-black bg-primary/10 text-primary">
                            {employee.firstName.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                </div>

                <div className="space-y-8 flex-1 w-full">
                    <div className="space-y-3 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-2">
                            <ShieldCheck className="h-3 w-3" />
                            {employee.folder ? t("verified-file-structure") : t("personal-account")}
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-black tracking-tighter text-foreground leading-tight">
                            {employee.firstName} {employee.lastName}
                        </h1>
                        <p className="text-base font-bold text-muted-foreground/80 uppercase tracking-[0.2em] flex items-center justify-center lg:justify-start gap-3">
                            <Briefcase className="h-5 w-5 text-primary" />
                            {employee.position}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {renderInfoItem(<Phone className="h-4 w-4" />, "phone", employee.phone || "-", "bg-emerald-500/10 text-emerald-500")}
                        {renderInfoItem(<Mail className="h-4 w-4" />, "email", employee.email || "-", "bg-blue-500/10 text-blue-500")}
                        <div className="md:col-span-2">
                            {renderInfoItem(
                                <MapPin className="h-4 w-4" />,
                                "location",
                                `${employee.location.name} — ${employee.location.address}`,
                                "bg-orange-500/10 text-orange-500"
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};
