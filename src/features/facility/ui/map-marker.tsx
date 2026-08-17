// features/facility/ui/map-marker.tsx
import { Marker, Popup } from "react-leaflet";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useMapStore } from "@/entities/store/use-map-store";
import type { Facility } from "@/entities/facility/model/facility";
import { MarkerPopupContent } from "./marker-popup-content";
import L from "leaflet";
import { getContrastTextColor } from "@/shared/lib/get-contrast-text-color";

// 1. Luminance utility to pick text color (black/white) based on background brightness

// Shrinks marker icons at low zoom so the map doesn't get cluttered with oversized pins.
const MIN_SCALE_ZOOM = 10;
const MAX_SCALE_ZOOM = 16;
const MIN_ICON_SCALE = 0.55;

const getIconScale = (zoom: number) => {
  const t = Math.min(
    1,
    Math.max(0, (zoom - MIN_SCALE_ZOOM) / (MAX_SCALE_ZOOM - MIN_SCALE_ZOOM))
  );
  return MIN_ICON_SCALE + t * (1 - MIN_ICON_SCALE);
};

// 2. Fallback static icons (used when item.color is missing)
const makeDefaultIcon = (className: string, scale: number) =>
  new L.Icon({
    iconUrl: "/marker-icon.png",
    shadowUrl: "",
    iconSize: [25 * scale, 41 * scale],
    iconAnchor: [12 * scale, 41 * scale],
    className,
  });

type Props = { item: Facility };

export const MapMarker = React.memo(
  ({ item }: Props) => {
    const markerRef = useRef<L.Marker>(null);
    const [isOpen, setIsOpen] = useState(false);

    const { pendingPopupId, setPendingPopupId, isEditMap } = useMapStore();
    const zoom = useMapStore((s) => s.viewZoom);
    const scale = useMemo(() => getIconScale(zoom), [zoom]);

    useEffect(() => {
      if (pendingPopupId === item.id && markerRef.current) {
        markerRef.current.openPopup();
        setPendingPopupId(null);
      }
    }, [pendingPopupId, item.id, setPendingPopupId]);

    // Create the icon dynamically or fall back to static image icons
    const markerIcon = useMemo(() => {
      const hasChildren = item.hasChildren

      // Rule: Fall back to static image icons if no color is provided
      if (!item.color) {
        return makeDefaultIcon(hasChildren ? "marker-yellow" : "marker-blue", scale);
      }

      // Rule: Dynamic shapes based on children presence
      const borderRadius = hasChildren ? "4px" : "50%";
      const textColor = getContrastTextColor(item.color);
      const displayValue = item.number !== undefined ? item.number : "";
      const size = 32 * scale;

      return L.divIcon({
        className: "custom-facility-marker",
        html: `
          <div style="
            background-color: ${item.color};
            color: ${textColor};
            border-radius: ${borderRadius};
            width: ${size}px;
            height: ${size}px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: ${13 * scale}px;
            border: 2px solid white;
            box-sizing: border-box;
          ">
            ${displayValue}
          </div>
        `,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      });
    }, [item.color, item.number, item.hasChildren, scale]);

    return (
      <Marker
        icon={markerIcon}
        draggable={isEditMap}
        ref={markerRef}
        zIndexOffset={item.hasChildren ? 1000 : 0}
        position={[item.geom.lat, item.geom.lng]}
        eventHandlers={{
          popupopen: () => setIsOpen(true),
          popupclose: () => setIsOpen(false),
        }}
      >
        <Popup>{isOpen && <MarkerPopupContent item={item} />}</Popup>
      </Marker>
    );
  },
  (prev, next) => {
    // Re-render check when marker props update
    const prevHasChildren = Boolean(prev.item.hasChildren);
    const nextHasChildren = Boolean(next.item.hasChildren);

    return (
      prev.item.id === next.item.id &&
      prev.item.color === next.item.color &&
      prev.item.number === next.item.number &&
      prevHasChildren === nextHasChildren
    );
  }
);