import { create } from "zustand";
import type { Facility } from "../facility/model/facility";

type MapStore = {
  isEditMap: boolean;
  selectedFacility:null | Facility
  pendingPopupId:null| string
};

type MapAction = {
  toggleCursor: () => void;
  setSelectedFacility:(facility:Facility | null) => void,
  setPendingPopupId: (id: string | null) => void,
};

export const useMapStore = create<MapAction & MapStore>((set) => ({
  isEditMap: false,
  selectedFacility: null,
  pendingPopupId: null,
  setPendingPopupId: (id: string | null) => set({ pendingPopupId: id }),
  setSelectedFacility: (facility: Facility | null) => 
    set({ selectedFacility: facility, pendingPopupId: facility?.id || null }),
  toggleCursor: () =>
    set((state) => ({
      isEditMap: !state.isEditMap,
    })),
}));
