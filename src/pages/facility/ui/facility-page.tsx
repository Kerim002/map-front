
import { FacilityNavbar } from "@/widgets/facility/facility-navbar";
import { FacilityCard } from "@/widgets/facility/facility-card";
import { FacilityTabs } from "@/widgets/facility/facility-tabs";
import { UpdateFacilitySheet } from "@/features/facility/sheet/update-facility-sheet";


export function FacilityPage() {
  return (
    <div className="min-h-full bg-background/50 p-8 lg:p-12 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <UpdateFacilitySheet />
      {/* --- HEADER SECTION --- */}
      <FacilityNavbar />

      {/* --- MAIN CONTENT GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* LEFT COLUMN (Image & Key Stats) */}
        <div className="lg:col-span-4 space-y-8">
          <FacilityCard />
        </div>

        {/* RIGHT COLUMN (Tabs for Workers, Docs, Details) */}
        <div className="lg:col-span-8">
          <FacilityTabs />
        </div>
      </div>
    </div>
  );
}
