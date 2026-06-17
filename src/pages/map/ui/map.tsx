import { MapView } from "@/entities/facility/ui/map-view";
import { UpdateFacilitySheet } from "@/features/facility/sheet/update-facility-sheet";
import { MapNavbar } from "@/widgets/map-navbar/map-navbar";

export const Map = () => {

  return (
    <div className="w-full h-full relative overflow-hidden">
      <MapNavbar />
      <MapView />
      <UpdateFacilitySheet />
    </div>
  );
};



