
import { FacilityNavbar } from "@/widgets/facility/facility-navbar";
import { FacilityCard } from "@/widgets/facility/facility-card";
import { Separator } from "@/shared/ui/separator";
import { FacilityTabs } from "@/widgets/facility/facility-tabs";

// Mock Data (Replace this with data from your API)



export function FacilityPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background p-8 space-y-6">
      {/* --- HEADER SECTION --- */}
    <FacilityNavbar/>
      <Separator />

      {/* --- MAIN CONTENT GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT COLUMN (Image & Key Stats) */}
        <FacilityCard/>

        {/* RIGHT COLUMN (Tabs for Workers, Docs, Details) */}
        <FacilityTabs/>
      </div>
    </div>
  );
}
