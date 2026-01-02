
import { useTranslation } from "react-i18next";
import { FacilityWorkersTab } from "@/features/facility/ui/facility-workers-tab";
import { FacilityDocumentsTab } from "@/features/facility/ui/facility-documents-tab";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/shared/ui/tabs";
import { Card } from "@/shared/ui/card";




export const FacilityTabs = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      <Tabs defaultValue="workers" className="w-full">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/30">
          <TabsList className="flex gap-10 bg-transparent p-0">
            <TabsTrigger
              value="workers"
              className="relative rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-4 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/60 data-[state=active]:text-primary transition-all duration-300"
            >
              {t("workers-and-contacts")}
              <div className="absolute bottom-[-2px] left-0 w-full h-[3px] bg-primary rounded-full opacity-0 data-[state=active]:opacity-100 transition-opacity" />
            </TabsTrigger>
            <TabsTrigger
              value="documents"
              className="relative rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-4 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/60 data-[state=active]:text-primary transition-all duration-300"
            >
              {t("documents")}
              <div className="absolute bottom-[-2px] left-0 w-full h-[3px] bg-primary rounded-full opacity-0 data-[state=active]:opacity-100 transition-opacity" />
            </TabsTrigger>
          </TabsList>

          <div className="hidden md:flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground/30">
            <span>Auto-Sync Enabled</span>
            <div className="size-1.5 rounded-full bg-primary/30" />
          </div>
        </div>

        <Card className="border-border/50 shadow-2xl shadow-primary/5 bg-card/60 backdrop-blur-md rounded-[2.5rem] border-0 p-10">
          <TabsContent value="workers" className="mt-0 focus-visible:outline-none">
            <FacilityWorkersTab />
          </TabsContent>
          <TabsContent value="documents" className="mt-0 focus-visible:outline-none">
            <FacilityDocumentsTab />
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  )
}
