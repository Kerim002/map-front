import { MapView } from "@/entities/map/ui/map-view";
import { FacilityDetailDialog } from "@/features/map/dialog/facility-detail-dialog";
import { UpdateFacilitySheet } from "@/features/map/sheet/update-facility-sheet";
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
