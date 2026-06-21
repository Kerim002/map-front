// features/facility/ui/map-marker.tsx
import { Marker } from "react-leaflet";
import React, { useEffect, useRef, useState } from "react";
import { useMapStore } from "@/entities/store/use-map-store";
import type { Facility } from "@/entities/facility/model/facility";
import { MarkerPopupContent } from "./marker-popup-content";
import L from "leaflet";
import { Popup } from "react-leaflet";

// ✅ Fix 3: Hoisted to module level — created ONCE, not 2000 times
const ICON_YELLOW = new L.Icon({
  iconUrl: "/marker-icon.png",
  shadowUrl: "",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  className: "marker-yellow",
});

const ICON_BLUE = new L.Icon({
  iconUrl: "/marker-icon.png",
  shadowUrl: "",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  className: "marker-blue",
});

type Props = { item: Facility };

// ✅ React.memo: only re-renders if item changes
export const MapMarker = React.memo(({ item }: Props) => {
  const markerRef = useRef<L.Marker>(null);
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Only the state/refs this component actually needs
  const { pendingPopupId, setPendingPopupId, isEditMap } = useMapStore();

  // ✅ pendingPopupId effect — still runs on 2000 markers
  // but now the component is so lightweight it barely matters
  useEffect(() => {
    if (pendingPopupId === item.id && markerRef.current) {
      markerRef.current.openPopup();
      setPendingPopupId(null);
    }
  }, [pendingPopupId, item.id, setPendingPopupId]);

  const icon = item.hasChildren ? ICON_YELLOW : ICON_BLUE;

  return (
    <Marker
      icon={icon}
      draggable={isEditMap}
      ref={markerRef}
      position={[item.geom.lat, item.geom.lng]}
      eventHandlers={{
        popupopen: () => setIsOpen(true),
        popupclose: () => setIsOpen(false),

      }}
    >
      <Popup>

        {isOpen && (
          <MarkerPopupContent 
          item={item} 

             />
        )}
      </Popup>
    </Marker>
  );
}, (prev, next) => {
  // Only re-render if these specific things change
  return (
    prev.item.id === next.item.id &&
    prev.item.hasChildren === next.item.hasChildren
  );
});