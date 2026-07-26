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
import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";
import L from "leaflet";
import { CreateFacilitySheet } from "@/features/facility/sheet/create-facility-sheet";
import { useQuery } from "@tanstack/react-query";
import { facilityApi } from "../api/facility.api";
import type { Facility } from "../model/facility";
import useQueryParam from "@/shared/hooks/use-query-param";
import { useTranslation } from "react-i18next";
import { useSidebar } from "@/shared/ui/sidebar";
import { MapMarker } from "@/features/facility/ui/map-marker";
import { useMapFilterStore } from "@/entities/store/use-map-filters-store";
// import MarkerClusterGroup from 'react-leaflet-cluster';

type Props = {
  className?: string;
};

function debounce<Args extends any[]>(fn: (...args: Args) => void, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

const SearchResultController = () => {
  const map = useMap();
  const { selectedFacility, setPendingPopupId } = useMapStore();

  const flyRequestId = useRef(0);

  useEffect(() => {
    if (!selectedFacility) return;
    map.closePopup();
    setPendingPopupId(null);
    flyRequestId.current += 1;
    const currentId = flyRequestId.current;
    map.flyTo(
      [selectedFacility.geom.lat, selectedFacility.geom.lng],
      16,
      { animate: true }
    );
    const onMoveEnd = () => {
      if (flyRequestId.current !== currentId) return;

      setPendingPopupId(selectedFacility.id);
      map.off("moveend", onMoveEnd);
    };

    map.on("moveend", onMoveEnd);

    return () => {
      map.off("moveend", onMoveEnd);
    };
  }, [selectedFacility, map, setPendingPopupId]);

  return null;
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
import { useMemo } from "react";


const MapFetcher = ({
  onDataLoaded,
}: {
  onDataLoaded: Dispatch<SetStateAction<Facility[]>>;
}) => {
  const filters = useMapFilterStore((s) => s.filters)
  const map = useMap();

  const [bounds, setBounds] = useState(() => map.getBounds());

  // Debounce the state update so it waits until the user pauses moving
  const debouncedSetBounds = useMemo(
    () => debounce((mapInstance: L.Map) => {
      setBounds(mapInstance.getBounds());
    }, 200), // 200ms delay
    []
  );

  useMapEvents({
    moveend: () => debouncedSetBounds(map),
    zoomend: () => debouncedSetBounds(map),
  });

  const min_lat = bounds.getSouth();
  const min_lng = bounds.getWest();
  const max_lat = bounds.getNorth();
  const max_lng = bounds.getEast();

  const { data } = useQuery(
    facilityApi.facilityBound({
      min_lat,
      min_lng,
      max_lat,
      max_lng,
      region_id: filters.regionId,
      building_id: filters.buildingId,
      authority_id: filters.authorityId,
      ownership_id: filters.ownershipId,
      performance_id: filters.performanceId,
      city_id: filters.cityId,
      district_id: filters.districtId,
      specialization_id: filters.specId,
    })
  )

  useEffect(() => {
    onDataLoaded(data ?? [])
  }, [data, onDataLoaded])

  return null
}
export const MapView = ({ className }: Props) => {
  const { isEditMap, setMarkerPos, markerPos } = useMapStore();
  // const { isEditMap, setMarkerPos, markerPos, viewCenter, viewZoom } = useMapStore();
  const { t } = useTranslation();
  const { setQuery } = useQueryParam();
  const [fetchedMarkers, setFetchedMarkers] = useState<Facility[]>([]);
  const handleMapClick = (pos: L.LatLng) => {
    setMarkerPos(pos);
    setQuery([
      { key: "lat", value: pos.lat },
      { key: "lng", value: pos.lng },
    ]);
  };



  return (
    <div className={`w-full h-full relative z-0 ${className}`}>
      <MapContainer
        // whenCreated={(map) => useMapStore.getState().setMapRef(map)}

        // center={viewCenter}
        center={[37.95, 58.38]}
        // center={[37.485892221826084, 53.994884490966804]}

        // zoom={viewZoom}
        zoom={13}
        minZoom={7}
        className="h-full w-full cursor-pointer map-container-reverter"
        boxZoom={false}
        zoomControl={false}
        style={{ cursor: isEditMap ? "default" : "grab" }}
      >
        <TileLayer
          url={`${import.meta.env.VITE_MAP_URL
            }/styles/test-style/{z}/{x}/{y}.png`}
        />
        <SyncStoredView />
        <ZoomSync />
        <MapRefController />
        <ResizeMap />
        <SearchResultController />
        <MapInteractionController isEditMap={isEditMap} />
        <MapFetcher onDataLoaded={setFetchedMarkers} />
        <ClickHandler isEditMap={isEditMap} onMapClick={handleMapClick} />

        {/* Markers from API */}
        {/* <MarkerClusterGroup chunkedLoading> */}
          {fetchedMarkers?.map((item) => (
            <MapMarker key={item.id} item={item} />
          ))}
        {/* </MarkerClusterGroup> */}

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


const ResizeMap = () => {
  const map = useMap();
  const { state } = useSidebar();

  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize({ animate: true });
    }, 100);

    return () => clearTimeout(timer);
  }, [state, map]);

  return null;
};

const MapRefController = () => {
  const map = useMap();
  const setMapRef = useMapStore((s) => s.setMapRef);

  useEffect(() => {
    setMapRef(map);
  }, [map, setMapRef]);

  return null;
};

const SyncStoredView = () => {
  const map = useMap();
  const { viewCenter, viewZoom } = useMapStore();

  useEffect(() => {
    // This runs once when the map component mounts
    map.setView(viewCenter, viewZoom);
  }, []); // Empty dependency array: only on mount

  return null;
};

// Keeps viewZoom in the store up to date so marker icons can scale with it.
const ZoomSync = () => {
  const map = useMap();
  const setView = useMapStore((s) => s.setView);

  useEffect(() => {
    setView([map.getCenter().lat, map.getCenter().lng], map.getZoom());
  }, []);

  useMapEvents({
    zoomend: () => {
      setView([map.getCenter().lat, map.getCenter().lng], map.getZoom());
    },
  });

  return null;
};