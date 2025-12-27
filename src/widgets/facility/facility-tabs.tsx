
import { useTranslation } from "react-i18next";
import { FacilityWorkersTab } from "@/features/facility/ui/facility-workers-tab";
import { FacilityDocumentsTab } from "@/features/facility/ui/facility-documents-tab";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs";




export const FacilityTabs = () => {
  const { t } = useTranslation();

  return (
    <div className="md:col-span-2">
      <Tabs defaultValue="workers" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="workers">
            {t("workers-and-contacts")}
          </TabsTrigger>
          <TabsTrigger value="documents">{t("documents")}</TabsTrigger>
        </TabsList>

        {/* --- WORKERS SECTION --- */}
        <FacilityWorkersTab />

        {/* --- DOCUMENTS SECTION --- */}
        <FacilityDocumentsTab />
      </Tabs>
    </div>
  )
}
