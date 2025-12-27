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
        <div className="flex items-start justify-between">
            <div className="space-y-1">
                <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold tracking-tight">
                        {facilityData.name}
                    </h1>
                </div>
                <p className="flex items-center text-slate-500">
                    <MapPin className="mr-1 h-4 w-4" />
                    {facilityData.address} • {facilityData.region}
                </p>
            </div>
            <div className="flex gap-2">
                {/* <Button variant="outline">{t("edit-facility")}</Button> */}
                <Button onClick={handleButtonClick} variant="outline">Upload facility image</Button>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />
                <Button onClick={() => navigate("/map")}>{t("view-on-map")}</Button>
            </div>
        </div>
    )
}
