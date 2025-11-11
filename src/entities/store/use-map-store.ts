import { create } from "zustand";

type MapStore = {
  isEditMap: boolean;
};

type MapAction = {
  toggleCursor: () => void;
};

export const useMapStore = create<MapAction & MapStore>((set) => ({
  isEditMap: false,
  toggleCursor: () =>
    set((state) => ({
      isEditMap: !state.isEditMap,
    })),
}));
