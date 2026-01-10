import { facilityApi } from "@/entities/facility/api/facility.api";
import { useDeleteFacility } from "@/features/facility/hook/use-delete-facility";
import { FacilityImageCarusel } from "@/features/facility/ui/facility-image-carusel"
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { useQuery } from "@tanstack/react-query";
import { Building2, Car, FireExtinguisherIcon } from "lucide-react"
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";




export const FacilityCard = () => {
  const { t } = useTranslation();
  const { facilityId } = useParams()
  const { data } = useQuery(facilityApi.detail(facilityId))
  const {mutate} = useDeleteFacility()
  const navigate = useNavigate()

  const handleDelete = () => {
    mutate(facilityId ?? "", {
      onSuccess:() => {
        navigate("/map")
      }
    })
  }

  return (
    <Card className="overflow-hidden border-border/50 shadow-2xl shadow-primary/5 bg-card/60 backdrop-blur-md rounded-[2.5rem] border-0">
      <div className="relative group">
        <FacilityImageCarusel />
        <div className="absolute top-6 left-6 transition-transform group-hover:scale-105 duration-500">
          <span className="bg-primary/90 text-primary-foreground text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-xl shadow-2xl backdrop-blur-xl border border-primary-foreground/20">
            {data?.cadaster ?? ""}
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
          <span className="text-sm font-black text-foreground">{data?.building?.type}</span>
        </div>
        {
          data?.area ?

            <div className="flex justify-between items-center py-5 border-t border-border/30 group/row">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 group-hover/row:bg-blue-500 group-hover/row:text-white transition-all duration-300">
                  <div className="size-4 flex items-center justify-center font-bold text-[10px]">m²</div>
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 group-hover/row:text-primary transition-colors">
                  {t("total-area")}
                </span>
              </div>
              <span className="text-sm font-black text-foreground tabular-nums tracking-tight">{data.area}m²</span>
            </div> : null
        }


        <div className="flex justify-between items-center py-5 border-t border-border/30 group/row">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-violet-500/10 text-violet-500 group-hover/row:bg-violet-500 group-hover/row:text-white transition-all duration-300">
              <Building2 className="h-4 w-4" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 group-hover/row:text-primary transition-colors">{t("company")}</span>
          </div>
          <span className="text-sm font-black text-foreground uppercase tracking-tight">{data?.company?.type ?? "-"}</span>
        </div>

        {
          data?.parking ?
            <div className="flex justify-between items-center py-5 border-t border-border/30 group/row">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 group-hover/row:bg-blue-500 group-hover/row:text-white transition-all duration-300">
                  <Car />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 group-hover/row:text-primary transition-colors">
                  {t("parking")}
                </span>
              </div>
              <span className="text-sm font-black text-foreground tabular-nums tracking-tight">{data.parking}</span>
            </div> : null
        }
        {
          data?.fireInspectionAt ?
            <div className="flex justify-between items-center py-5 border-t border-border/30 group/row">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 group-hover/row:bg-blue-500 group-hover/row:text-white transition-all duration-300">
                  <FireExtinguisherIcon />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 group-hover/row:text-primary transition-colors">
                  {t("fire-inspection-at")}
                </span>
              </div>
              <span className="text-sm font-black text-foreground tabular-nums tracking-tight">{data.fireInspectionAt}</span>
            </div> : null
        }


        <Button variant={"destructive"} className="w-full" onClick={handleDelete}>{t("delete")}</Button>

        {/* <div className="flex justify-between items-center py-5 border-y border-border/30 group/row">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 group-hover/row:bg-emerald-500 group-hover/row:text-white transition-all duration-300">
              <div className="size-4 rounded-full border-2 border-current" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 group-hover/row:text-primary transition-colors">Current Status</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div> */}
      </CardContent>
    </Card>
  )
}
