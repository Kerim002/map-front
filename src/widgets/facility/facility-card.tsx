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
    <Card className="overflow-hidden border-border/50 shadow-2xl shadow-primary/5 bg-card/60 backdrop-blur-md rounded-[2.5rem] border-0">
      <div className="relative group">
        <FacilityImageCarusel />
        <div className="absolute top-6 left-6 transition-transform group-hover:scale-105 duration-500">
          <span className="bg-primary/90 text-primary-foreground text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-xl shadow-2xl backdrop-blur-xl border border-primary-foreground/20">
            #{facilityData.id}
          </span>
        </div>
      </div>

      <CardHeader className="px-8 pt-10 pb-6">
        <CardTitle className="text-2xl font-black tracking-tight">{t("facility-overview")}</CardTitle>
        <CardDescription className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest mt-1">
          {t("main-visual-and-specifications")}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-8 pb-10 space-y-2">
        <div className="flex justify-between items-center py-5 border-t border-border/30 group/row">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500 group-hover/row:bg-indigo-500 group-hover/row:text-white transition-all duration-300">
              <Building2 className="h-4 w-4" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 group-hover/row:text-primary transition-colors">{t("type")}</span>
          </div>
          <span className="text-sm font-black text-foreground">{facilityData.type}</span>
        </div>

        <div className="flex justify-between items-center py-5 border-t border-border/30 group/row">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 group-hover/row:bg-blue-500 group-hover/row:text-white transition-all duration-300">
              <div className="size-4 flex items-center justify-center font-bold text-[10px]">m²</div>
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 group-hover/row:text-primary transition-colors">
              {t("total-area")}
            </span>
          </div>
          <span className="text-sm font-black text-foreground tabular-nums tracking-tight">{facilityData.area}</span>
        </div>

        <div className="flex justify-between items-center py-5 border-t border-border/30 group/row">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-violet-500/10 text-violet-500 group-hover/row:bg-violet-500 group-hover/row:text-white transition-all duration-300">
              <Building2 className="h-4 w-4" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 group-hover/row:text-primary transition-colors">{t("company")}</span>
          </div>
          <span className="text-sm font-black text-foreground uppercase tracking-tight">{facilityData.company}</span>
        </div>

        <div className="flex justify-between items-center py-5 border-y border-border/30 group/row">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 group-hover/row:bg-emerald-500 group-hover/row:text-white transition-all duration-300">
              <div className="size-4 rounded-full border-2 border-current" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 group-hover/row:text-primary transition-colors">Current Status</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {facilityData.status}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
