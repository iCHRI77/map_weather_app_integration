"use client"
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { fetchPlacesDataCoordinates} from "../utils/api";
import { Icon } from 'leaflet';

// Fix for Leaflet's default icon in Next.js
delete (Icon.Default.prototype as { _getIconUrl?: string })._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface MapProps {
  onMarkerClick?: (position: [number, number]) => void;
  onPlaceNameChange?: (name: string) => void;
}

const ClickableMap = ({ onMapClick }: { onMapClick: (position: [number, number]) => void }) => {
  useMapEvents({
    click: (event) => {
      const { lat, lng } = event.latlng;
      onMapClick([lat, lng]);
    },
  });
  return null;
};

export default function Map({ onMarkerClick, onPlaceNameChange }: MapProps) {
  const [markers, setMarkers] = useState<[number, number][]>([]);

  // Manage clicks on map
  const handleMapClick = (position: [number, number]) => {
    setMarkers([position]);
    onMarkerClick?.(position);
    
    fetchPlacesDataCoordinates(position[0], position[1])
      .then((data) => {
        if (data?.city && typeof data.city === 'string') {
          onPlaceNameChange?.(data.city);
        }
      })
      .catch(console.error);
  };

  return (
    <div className="w-full h-full">
      <MapContainer 
        center={[3.525, -76.29876]} 
        zoom={14} 
        style={{ 
          width: '100%', 
          height: '100%',
          backgroundColor: '#e5e7eb',
        }}
        className="rounded-2xl shadow-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <ClickableMap onMapClick={handleMapClick} />
        {markers.map((position, index) => (
          <Marker 
            key={index} 
            position={position}
            icon={new Icon({
              iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
              iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
              shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41]
            })}
          />
        ))}
      </MapContainer>
    </div>
  );
}