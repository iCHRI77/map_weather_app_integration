"use client"
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Importar los estilos
import L from "leaflet";
import { useEffect, useState } from "react";
import CurrentWeather from "./current_Weather";
import { fetchPlacesData, fetchPlacesDataCoordinates, fetchWeatherDataCelcius } from "../utils/api";

// Zustand store for markers
import { useMarkersStore } from '@/lib/markersStore';

// Fix for Leaflet's default icon in Next.js
import { Icon } from 'leaflet';

delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});


const ClickableMap = ({ onMapClick }: { onMapClick: (position: [number, number]) => void }) => {
  useMapEvents({
    click: (event) => {
      const { lat, lng } = event.latlng; // Coords of click
      onMapClick([lat, lng]); // call the funct as prop
    },
  });
  return null;
};

interface MapProps {
  onMarkerClick?: (position: [number, number]) => void;
}

export default function Map({ onMarkerClick }: MapProps) {
  const [markers, setMarkers] = useState<[number, number][]>([]); // Save mark
  const [placeName, setPlaceName] = useState("");

  const [weatherData, setWeatherData] = useState({
    temperature: 0,
    elevation: 0,
    windSpeed: 0,
    icon: "https://openweathermap.org/img/wn/",
    isDay: true,
  });

  const { addPlace } = useMarkersStore();



  // Manage clicks in map
  const handleMapClick = (position: [number, number]) => {
    setMarkers([position]);
    if (onMarkerClick) {
      onMarkerClick(position);
    }
    fetchPlacesDataCoordinates(position[0], position[1]).then((data) => {
      if (data && typeof data.city === 'string') {
        setPlaceName(data.city);
      }
    }).catch((error) => {
      console.error('Error fetching data:', error);
    });
  };


  useEffect(() => {
    if (markers.length === 0) return;

    let ignore = false;
    fetchWeatherDataCelcius(markers[0])
      .then((data) => {
        if (!ignore) {
          setWeatherData({
            elevation: data.elevation,
            temperature: data.current_weather.temperature,
            windSpeed: data.current_weather.windspeed,
            icon: data.current_weather.icon,
            isDay: data.current_weather.isDay,
          });
        }
      });
    return () => { ignore = true; };

  }, [markers]);

  const handleSearch = async (query: string) => {
    try {
      const data = await fetchPlacesData(query);
      if (data && typeof data.lat === 'number' && typeof data.long === 'number') {
        setMarkers([[data.lat, data.long]]);
        setPlaceName(data.name);
      }
    } catch (error) {
      console.error('Error searching location:', error);
    }
  };

  return (
    <div className="w-full h-full">
      <MapContainer 
        center={[3.525, -76.29876]} 
        zoom={14} 
        style={{ 
          width: '100%', 
          height: '100%',
          backgroundColor: '#e5e7eb', // Light gray background
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
          >
            {/* Popup content removed as per your request */}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}