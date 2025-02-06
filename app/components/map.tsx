"use client"
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Importar los estilos
import L from "leaflet";
import { useEffect, useState } from "react";
import CurrentWeather from "./current_Weather";
import { fetchPlacesData, fetchPlacesDataCoordinates, fetchWeatherDataCelcius, fetchWeatherDataFahrenheit } from "../utils/api";


// for the CRUD logic of the places
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { AddPlace } from '@/lib/slices/markersReducer';

// icons solution, this is for change the default config of icons of the map or load the icons from Leaflet (has a problem by default).
L.Icon.Default.prototype.options.iconRetinaUrl = require("leaflet/dist/images/marker-icon-2x.png");
L.Icon.Default.prototype.options.iconUrl = require("leaflet/dist/images/marker-icon.png");
L.Icon.Default.prototype.options.shadowUrl = require("leaflet/dist/images/marker-shadow.png");


const ClickableMap = ({ onMapClick }: any) => {
  useMapEvents({
    click: (event) => {
      const { lat, lng } = event.latlng; // Coords of click
      onMapClick([lat, lng]); // call the funct as prop
    },
  });
  return null;
};

export default function Map() {
  const [markers, setMarkers] = useState<[number, number][]>([]); // Save mark
  const [placeSearch, setPlaceSearch] = useState("");
  const [placeName, setPlaceName] = useState("");

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

  return (
    <>
      <div className="absolute flex top-8 left-1/2 transform -translate-x-1/2 w-72">
        <input
          type="text"
          value={placeSearch}
          onChange={(e) => setPlaceSearch(e.target.value)}
          placeholder="Search a Place..."
          style={{ padding: "8px", width: "200px" }}
        />
        <button
          className="text-md px-3 py-2 flex items-center text-base uppercase font-bold leading-snug bg-green-600 text-white hover:opacity-75 hover:text-black"
          onClick={async () => {
            await fetchPlacesData(placeSearch).then((data) => {
              if (data && typeof data.lat === 'number' && typeof data.long === 'number') {
                setMarkers([[data.lat, data.long]]);
                setPlaceName(data.name);
              }
            }).catch((error) => {
              console.error('Error fetching data:', error);
            });
          }
          }>
          Buscar
        </button>
      </div>
      <MapContainer center={[3.525, -76.29876]} zoom={14} style={{ height: "100vh", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <ClickableMap onMapClick={handleMapClick} />
        {markers.map((position, index) => (
          <Marker key={index} position={position}>
            <Popup  >
              <CurrentWeather
                icon={weatherData.icon}
                elevation={weatherData.elevation}
                temperature={weatherData.temperature}
                windSpeed={weatherData.windSpeed}
                isDay={weatherData.isDay}
                onAdd={() =>
                  dispatch(
                    AddPlace({
                      name: placeName,
                      temperature: String(weatherData.temperature),
                      weather: weatherData.icon
                    })
                  )} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}