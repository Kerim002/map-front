import { useMapStore } from "@/entities/store/use-map-store";
import { Switch } from "@/shared/ui/switch";
import { Edit2 } from "lucide-react";
import { MapSearchBox } from "./map-search-box";
import { useTranslation } from "react-i18next";
import { useProfileQuery } from "@/features/user/hooks/use-profile-query";

export const MapNavbar = () => {
  const { setEditMap, isEditMap } = useMapStore();
  const { t } = useTranslation()
  const { data } = useProfileQuery()
  const handleToggle = (e: boolean) => {

    setEditMap(e)
  }
  if (data?.role === "viewer") {
    return null
  }
  return (
    <div className="absolute top-3 left-6 right-6  z-[40] flex items-center justify-between pointer-events-none gap-6">
      <MapSearchBox />

      <div className="flex items-center gap-6 pointer-events-auto bg-background/40 backdrop-blur-xl px-6 h-12 rounded-[1.25rem] shadow-2xl border border-border/50 transition-all hover:bg-background/60">
        <div className="flex items-center gap-3 border-r border-border/20 pr-6">
          <div className={`p-1.5 rounded-lg ${isEditMap ? "bg-primary text-primary-foreground" : "bg-muted/30 text-muted-foreground/40"}`}>
            <Edit2 className="h-3.5 w-3.5" />
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">{t("edit-mode")}</span>
        </div>

        <div className="flex items-center gap-3">
          <Switch
            checked={isEditMap}
            onCheckedChange={handleToggle}
            className="data-[state=checked]:bg-primary shadow-sm"
          />
          <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isEditMap ? "text-primary" : "text-muted-foreground/40"}`}>
            {isEditMap ? t("active") : t("locked")}
          </span>
        </div>
      </div>
    </div>
  );
};
