import { create } from "zustand"

type MapFilters = {
  regionId?: string
  buildingId?: string
  authorityId?: string
  ownershipId?: string
  performanceId?: string
  specId?:string
  cityId?:string,
  districtId?:string
}

type MapFilterStore = {
  filters: MapFilters
  setFilter: (key: keyof MapFilters, value?: string) => void
  resetFilters: () => void
}

export const useMapFilterStore = create<MapFilterStore>((set) => ({
  filters: {},

  setFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value || undefined,
      },
    })),

  resetFilters: () => set({ filters: {} }),
}))