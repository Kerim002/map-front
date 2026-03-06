import { UpdateFacilitySheet } from "@/features/facility/sheet/update-facility-sheet";
import { FacilityInfo } from "@/widgets/facility/facility-info";
import { FacilityWorkers } from "./facility-workers";
import { FacilityPageHeader } from "@/widgets/facility/ui/facility-page-header";

export function FacilityPage() {
  return (
    <div className="min-h-full bg-background/50 p-6 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-[1600px] mx-auto">
      <FacilityPageHeader />
      <FacilityInfo />
      <div className="space-y-8">
        <FacilityWorkers />
      </div>
      <UpdateFacilitySheet />
    </div>
  );
}
