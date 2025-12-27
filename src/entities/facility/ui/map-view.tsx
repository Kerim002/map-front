import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useMapStore } from "@/entities/store/use-map-store";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import L from "leaflet";
import { CreateFacilitySheet } from "@/features/facility/sheet/create-facility-sheet";
import { useQuery } from "@tanstack/react-query";
import { facilityApi } from "../api/facility.api";
import type { Facility } from "../model/facility";
import useQueryParam from "@/shared/hooks/use-query-param";
import { useTranslation } from "react-i18next";
import { useSidebar } from "@/shared/ui/sidebar";
import { MapMarker } from "@/features/facility/ui/map-marker";

type Props = {
  className?: string;
};

const editMarkerIcon = new L.Icon({
  iconUrl: "/add-location.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const MapInteractionController = ({ isEditMap }: { isEditMap: boolean }) => {
  const map = useMap();
  useEffect(() => {
    const container = map.getContainer();
    container.style.cursor = isEditMap ? "default" : "grab";

    if (isEditMap) {
      map.dragging.disable();
      map.scrollWheelZoom.disable();
      map.doubleClickZoom.disable();
      map.boxZoom.disable();
      map.keyboard.disable();
    } else {
      map.dragging.enable();
      map.scrollWheelZoom.enable();
      map.doubleClickZoom.enable();
      map.boxZoom.enable();
      map.keyboard.enable();
    }
  }, [isEditMap, map]);

  return null;
};

const ClickHandler = ({
  isEditMap,
  onMapClick,
}: {
  isEditMap: boolean;
  onMapClick: (latlng: L.LatLng) => void;
}) => {
  useMapEvents({
    click(e) {
      if (isEditMap) {
        onMapClick(e.latlng);
      }
    },
  });
  return null;
};

const MapFetcher = ({
  onDataLoaded,
}: {
  onDataLoaded: Dispatch<SetStateAction<Facility[]>>;
}) => {
  const map = useMapEvents({
    moveend: handleFetch,
    zoomend: handleFetch,
  });

  const [bounds, setBounds] = useState(() => map.getBounds());

  function handleFetch() {
    setBounds(map.getBounds());
  }

  const min_lat = bounds.getSouth();
  const max_lat = bounds.getNorth();
  const min_lon = bounds.getWest();
  const max_lon = bounds.getEast();

  const { data } = useQuery(
    facilityApi.list({
      maxLat: max_lat,
      maxLng: max_lon,
      minLat: min_lat,
      minLng: min_lon,
    })
  );

  useEffect(() => {
    onDataLoaded(data ?? []);
  }, [data, onDataLoaded]);

  return null;
};

export const MapView = ({ className }: Props) => {
  const { isEditMap } = useMapStore();
  const { t } = useTranslation();
  const { setQuery } = useQueryParam();
  const [markerPos, setMarkerPos] = useState<L.LatLng | null>(null);
  const [fetchedMarkers, setFetchedMarkers] = useState<Facility[]>([]);
  const handleMapClick = (pos: L.LatLng) => {
    setMarkerPos(pos);
    setQuery([
      { key: "lat", value: pos.lat },
      { key: "lng", value: pos.lng },
    ]);
  };

  return (
    <div className={`w-full h-[calc(100dvh-56px)]  cursor-pointer z-0 ${className}`}>
      <MapContainer
        center={[37.95, 58.38]}
        zoom={13}
        minZoom={7}
        className="h-full w-full cursor-pointer map-container-reverter"
        boxZoom={false}
        zoomControl={false}
        style={{ cursor: isEditMap ? "default" : "grab" }}
      >
        <TileLayer
          url={`${
            import.meta.env.VITE_MAP_URL
          }/styles/test-style/{z}/{x}/{y}.png`}
        />
        <ResizeMap />
        <MapInteractionController isEditMap={isEditMap} />
        <MapFetcher onDataLoaded={setFetchedMarkers} />
        <ClickHandler isEditMap={isEditMap} onMapClick={handleMapClick} />

        {/* Markers from API */}
        {fetchedMarkers?.map((item) => (
          <MapMarker  item={item} />
        ))}

        {/* Add new marker (edit mode) */}
        {isEditMap && markerPos && (
          <Marker icon={editMarkerIcon} position={markerPos}>
            <Popup>
              <div className="flex flex-col items-center gap-2">
                <p className="dark:text-gray-200 text-sm">
                  {t("add-location-here")}
                </p>
                <CreateFacilitySheet />
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};


// Inside MapView.tsx or as a separate helper
const ResizeMap = () => {
  const map = useMap();
  const { state } = useSidebar(); // Access sidebar state

  useEffect(() => {
    // Small timeout to wait for the sidebar transition animation to finish
    const timer = setTimeout(() => {
      map.invalidateSize({ animate: true });
    }, 100); // Match this to your sidebar transition speed (usually 200-300ms)

    return () => clearTimeout(timer);
  }, [state, map]);

  return null;
};