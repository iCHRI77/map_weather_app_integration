import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Place {
  name: string;
  temperature: string;
  weather: string;
  country?: string;
  temperatureMin?: number;
  temperatureMax?: number;
  lat?: number;
  lon?: number;
}

interface MarkersState {
  markers: Place[];
  addPlace: (place: Place) => void;
  removePlace: (index: number) => void;
}

export const useMarkersStore = create<MarkersState>()(
  persist(
    (set) => ({
      markers: [],
      addPlace: (place) => 
        set((state) => ({
          markers: [...state.markers, place]
        })),
      removePlace: (index) =>
        set((state) => ({
          markers: state.markers.filter((_, i) => i !== index)
        })),
    }),
    {
      name: 'favorites-storage', // unique name for the storage
      storage: createJSONStorage(() => localStorage), // use localStorage
    }
  )
);
