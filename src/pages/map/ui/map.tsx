import { MapView } from "@/entities/facility/ui/map-view";
import { FacilityDetailDialog } from "@/features/facility/dialog/facility-detail-dialog";
import { UpdateFacilitySheet } from "@/features/facility/sheet/update-facility-sheet";
import { MapNavbar } from "@/widgets/map-navbar/map-navbar";

export const Map = () => {
  return (
    <div className="w-full h-screen">
      <MapNavbar />
      <MapView />
      <UpdateFacilitySheet />
      <FacilityDetailDialog />
    </div>
  );
};
