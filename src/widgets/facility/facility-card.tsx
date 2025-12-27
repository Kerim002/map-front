import { FacilityImageCarusel } from "@/features/facility/ui/facility-image-carusel"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Building2 } from "lucide-react"
import { useTranslation } from "react-i18next";


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

export const FacilityCard = () => {
      const { t } = useTranslation();
    
  return (
    <div className="md:col-span-1 space-y-6">
          {/* Facility Image Card */}
          <Card className="overflow-hidden dark:bg-slate-800 bg">
            <FacilityImageCarusel />
            <CardHeader>
              <CardTitle>{t("facility-overview")}</CardTitle>
              <CardDescription>
                {t("main-visual-and-specifications")}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-sm text-slate-500">Type</span>
                <span className="font-medium flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-slate-400" />{" "}
                  {facilityData.type}
                </span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-sm text-slate-500">
                  {t("total-area")}
                </span>
                <span className="font-medium">{facilityData.area}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">{t("company")}</span>
                <span className="font-medium">{facilityData.company}</span>
              </div>
            </CardContent>
          </Card>
        </div>
  )
}
