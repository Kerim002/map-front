import { create } from "zustand";
import type { Facility } from "../facility/model/facility";
import L from "leaflet";

type MapStore = {
  isEditMap: boolean;
  selectedFacility: Facility | null;
  pendingPopupId: string | null;
  mapRef: L.Map | null;
  markerPos: L.LatLng | null;
  viewCenter: [number, number]; // [lat, lng]
  viewZoom: number;
};

type MapAction = {
  setEditMap: (value: boolean) => void;
  setSelectedFacility: (facility: Facility | null) => void;
  setPendingPopupId: (id: string | null) => void;
  setMapRef: (map: L.Map) => void;
  setMarkerPos: (pos: L.LatLng | null) => void;
  flyToCoords: (
    coords: { lat: number; lng: number },
    zoom?: number
  ) => void;
  setView: (center: [number, number], zoom: number) => void;
};

export const useMapStore = create<MapStore & MapAction>((set, get) => ({
  /* ---------- STATE ---------- */
  isEditMap: false,
  selectedFacility: null,
  pendingPopupId: null,
  mapRef: null,
  markerPos: null,
  viewCenter: [37.95, 58.38],
  viewZoom: 13,

  setView: (viewCenter, viewZoom) => set({ viewCenter, viewZoom }),
  /* ---------- ACTIONS ---------- */

  setEditMap: (value: boolean) =>
    set({
      isEditMap: value,
      markerPos: value ? get().markerPos : null,
    }),

  setSelectedFacility: (facility) =>
    set({
      selectedFacility: facility,
      pendingPopupId: facility?.id ?? null,
      markerPos: null,
    }),

  setPendingPopupId: (id) =>
    set({
      pendingPopupId: id,
    }),

  setMapRef: (map) =>
    set({
      mapRef: map,
    }),

  setMarkerPos: (pos) =>
    set({
      markerPos: pos,
    }),

  flyToCoords: ({ lat, lng }, zoom = 16) => {
    const map = get().mapRef;
    if (!map) return;

    const latLng = new L.LatLng(lat, lng);

    map.closePopup();
    map.flyTo(latLng, zoom, { animate: true });

    set({
      markerPos: latLng,
      isEditMap: true,
      selectedFacility: null,
      pendingPopupId: null,
    });
  },
}));
