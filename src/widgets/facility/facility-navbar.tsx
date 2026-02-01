import { facilityApi } from "@/entities/facility/api/facility.api";
import { useCreateFacilityImage } from "@/features/facility/hook/use-create-facility-image";
import useQueryParam from "@/shared/hooks/use-query-param";
import { Button } from "@/shared/ui/button";
import { useQuery } from "@tanstack/react-query";
import { MapPin } from "lucide-react";
import { useRef, type ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";




export const FacilityNavbar = () => {
    const { setQuery } = useQueryParam();
    const { facilityId } = useParams()
    const { data } = useQuery(facilityApi.detail(facilityId))
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
 

                <h1 className="text-4xl lg:text-2xl font-black  text-foreground leading-[1.1]">
                    "{data?.name}"
                </h1>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground/60 text-sm font-semibold italic">
    
                    <div className="flex items-center gap-2">
                        <span className="not-italic text-foreground/80">{data?.region?.type}</span>
                        <span className="text-border">/</span>
                    </div>
                                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="not-italic text-foreground/80">{data?.address}</span>
                    </div>
                    {/* <div className="flex items-center gap-2">
                        <span className="text-border">/</span>
                        <span className="not-italic font-black text-primary/60 uppercase tracking-widest text-[10px]">{data.id}</span>
                    </div> */}
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
                <Button
                    onClick={() => setQuery([{ key: "location-id", value: facilityId }])}
                    className="h-12 px-6 font-black uppercase tracking-widest text-[11px] rounded-2xl border-border/50 hover:bg-muted/50 transition-all shadow-sm"
                    variant="outline"
                >
                    {t("edit-location")}
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
