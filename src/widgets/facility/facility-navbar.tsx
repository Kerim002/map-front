import { useCreateFacilityImage } from "@/features/facility/hook/use-create-facility-image";
import { Button } from "@/shared/ui/button";
import { MapPin } from "lucide-react";
import { useRef, type ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

const facilityData = {
    id: "BLD-921",
    name: "“Parahat” medeni-dynç alyş merkezi",
    type: "Medeni dync alys merkezi",
    status: "Operational",
    region: "Bagtyyarlyk District",
    address: "Magtymguly şaýoly, 98/1 Aşgabat şäheri",
    area: "450 m²",
    image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop", // Placeholder
    company: "Parahat MDAM",
};


export const FacilityNavbar = () => {
    const { facilityId } = useParams()
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { mutate } = useCreateFacilityImage()
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            mutate({ files: selectedFiles, id: facilityId as string })
            e.target.value = "";
        }
    };

    return (
        <div className="flex flex-col xl:flex-row items-start xl:items-end justify-between gap-8 pb-10 border-b border-border/30">
            <div className="space-y-4 max-w-4xl">
                <div className="flex items-center gap-3">
                    <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest leading-none">
                        Asset Registry
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest leading-none">
                        <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Operational
                    </div>
                </div>

                <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-foreground leading-[1.1]">
                    {facilityData.name}
                </h1>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground/60 text-sm font-semibold italic">
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="not-italic text-foreground/80">{facilityData.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-border">/</span>
                        <span className="not-italic text-foreground/80">{facilityData.region}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-border">/</span>
                        <span className="not-italic font-black text-primary/60 uppercase tracking-widest text-[10px]">{facilityData.id}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4 pt-4 xl:pt-0">
                <Button
                    onClick={handleButtonClick}
                    variant="outline"
                    className="h-12 px-6 font-black uppercase tracking-widest text-[11px] rounded-2xl border-border/50 hover:bg-muted/50 transition-all shadow-sm"
                >
                    {t("upload-photo")}
                </Button>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />
                <Button
                    onClick={() => navigate("/map")}
                    className="h-12 px-8 font-black uppercase tracking-widest text-[11px] rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all"
                >
                    {t("view-on-map")}
                </Button>
            </div>
        </div>
    )
}
