import { FacilityTable } from "@/widgets/facility/facility-table"
import { FacilityPageHeader } from "@/widgets/facility/ui/facility-page-header"

export const FacilityRentalListPage = () => {
  return (
    <div className="min-h-full bg-background/50 p-6 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-[1600px] mx-auto">
      <FacilityPageHeader />

      <div className="bg-card/60 backdrop-blur-md rounded-[3rem] border border-border/50 p-6 shadow-2xl shadow-primary/5">
        <FacilityTable />
      </div>
    </div>
  )
}
