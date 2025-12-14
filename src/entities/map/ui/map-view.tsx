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
import { CreateFacilitySheet } from "@/features/map/sheet/create-facility-sheet";
import { useQuery } from "@tanstack/react-query";
import { locationQueries } from "../api/location.queries";
import type { Location } from "../model/location";
import useQueryParam from "@/shared/hooks/use-query-param";
import { Button } from "@/shared/ui/button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
  onDataLoaded: Dispatch<SetStateAction<Location[]>>;
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
    locationQueries.list({
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
  const navigate = useNavigate();
  const [markerPos, setMarkerPos] = useState<L.LatLng | null>(null);
  const [fetchedMarkers, setFetchedMarkers] = useState<Location[]>([]);
  const handleMapClick = (pos: L.LatLng) => {
    setMarkerPos(pos);
    setQuery([
      { key: "lat", value: pos.lat },
      { key: "lng", value: pos.lng },
    ]);
  };

  return (
    <div className={`w-full h-full cursor-pointer z-0 ${className}`}>
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
        <MapInteractionController isEditMap={isEditMap} />
        <MapFetcher onDataLoaded={setFetchedMarkers} />
        <ClickHandler isEditMap={isEditMap} onMapClick={handleMapClick} />

        {/* Markers from API */}
        {fetchedMarkers?.map((item) => (
          <Marker key={item.id} position={[item.geom.lat, item.geom.lng]}>
            <Popup>
              <div>
                <p className="dark:text-gray-200">
                  {t("name")}: {item.name}
                </p>
                <Button
                  onClick={() =>
                    setQuery([{ key: "location-id", value: item.id }])
                  }
                  className="w-full mb-3"
                >
                  {t("edit-location")}
                </Button>
                <Button
                  // onClick={() => setQuery([{ key: "id", value: item.id }])}
                  onClick={() => navigate(`/map/${item.id}`)}
                  className="w-full"
                >
                  {t("view-detail")}
                </Button>
              </div>
            </Popup>
          </Marker>
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
