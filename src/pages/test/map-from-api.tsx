import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Popup,
} from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
type Market = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  size: string;
};

function MapFetcher({ onData }: { onData: (data: Market[]) => void }) {
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // If CTRL or META (cmd) is pressed → prevent browser zoom
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);
  const map = useMapEvents({
    moveend: fetchData,
    zoomend: fetchData,
  });

  async function fetchData() {
    const bounds = map.getBounds();
    const zoom = map.getZoom();

    const url = new URL("http://localhost:4000/markets");
    url.searchParams.set("north", bounds.getNorth().toString());
    url.searchParams.set("south", bounds.getSouth().toString());
    url.searchParams.set("east", bounds.getEast().toString());
    url.searchParams.set("west", bounds.getWest().toString());
    url.searchParams.set("zoom", zoom.toString());

    const res = await fetch(url.toString());
    const data = await res.json();
    onData(data);
  }

  useEffect(() => {
    fetchData(); // initial load
  }, []);

  return null;
}

export default function DynamicMarketMap() {
  const [markets, setMarkets] = useState<Market[]>([]);

  return (
    <MapContainer
      center={[37.95, 58.38]}
      zoom={13}
      minZoom={7}
      className="h-screen w-full"
      boxZoom={false}
      zoomControl={false}
    >
      <TileLayer url="http://localhost:8080/styles/test-style/{z}/{x}/{y}.png" />
      <MapFetcher onData={setMarkets} />
      {markets.map((m) => (
        <Marker key={m.id} position={[m.lat, m.lng]}>
          <Popup>{m.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
