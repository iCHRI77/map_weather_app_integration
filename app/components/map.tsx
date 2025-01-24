"use client"
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Importar los estilos
import L, { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import CurrentWeather from "./current_Weather";
import { fetchWeatherDataCelcius, fetchWeatherDataFahrenheit } from "../utils/api";

//for the CRUD logic of the places
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { AddPlace, RemovePlace } from '@/lib/slices/markersReducer';

// icons solution, this is for change the default config of icons of the map or load the icons from Leaflet (has a problem by default).
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});


// Componente para manejar clics en el mapa
const ClickableMap = ({ onMapClick }: any) => {
  useMapEvents({
    click: (event) => {
      const { lat, lng } = event.latlng; // Coordenadas del clic
      onMapClick([lat, lng]); // Llamar a la función pasada como prop
    },
  });
  return null; // Este componente no necesita renderizar nada
};

export default function Map() {
  const [markers, setMarkers] = useState<[number, number][]>([]); // Almacenar los marcadores
  const [weatherData, setWeatherData] = useState({
    temperature: 0,
    elevation: 0,
    windSpeed: 0,
    icon: "https://openweathermap.org/img/wn/",
    isDay: true,
  });

  const places = useSelector((state: RootState) => state.markersMapList.markers);
  const dispatch = useDispatch();



  // Manage clicks in map
  const handleMapClick = (position: [number, number]) => {
    setMarkers([position]);
    // console.log(markers)
    // when client click on save button, the position will be saved in the list
    // setSavedLocal((prevMarkers) => [...prevMarkers, position]);
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

  return (
    <MapContainer center={[3.53073, -76.29876]} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <ClickableMap onMapClick={handleMapClick} />
      {markers.map((position, index) => (
        <Marker key={index} position={position}>
          <Popup>
            <CurrentWeather
              icon={weatherData.icon}
              elevation={weatherData.elevation}
              temperature={weatherData.temperature}
              windSpeed={weatherData.windSpeed}
              isDay={weatherData.isDay}
              onAdd={() => 
                dispatch(
                AddPlace({
                name: "Place_" + (places.length + 1),
                temperature: String(weatherData.temperature),
                weather: weatherData.icon
              })
              )} />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}