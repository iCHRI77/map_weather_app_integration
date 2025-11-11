import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Place {
  name: string;
  country: string;
  temperature: string;
  temperatureMin: number;
  temperatureMax: number;
  weather: string;
  lat: number;
  lon: number;
}

interface MarkersState {
  markers: Place[];
  addPlace: (place: Place) => void;
  removePlace: (index: number) => void;
}

const useMarkersStore = create<MarkersState>()(
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
      name: 'weather-favorites-storage', // unique name for localStorage
      storage: createJSONStorage(() => localStorage), // use localStorage
    }
  )
);

export default useMarkersStore;
