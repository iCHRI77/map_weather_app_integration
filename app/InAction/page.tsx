"use client"
import dynamic from 'next/dynamic';
import { useState } from 'react';

const Map = dynamic(() => import('./map'), { ssr: false });
import Sidebar from "./sidebar"
import StoreProvider from "@/lib/StoreProvider";
import CurrentWeather from "./current_Weather";
import { useEffect } from "react";
import { fetchPlacesDataCoordinates, fetchWeatherDataCelcius } from "../utils/api";
import { useMarkersStore } from '@/lib/markersStore';

export default function InAction() {
  const [markers, setMarkers] = useState<[number, number][]>([]);
  const [country, setCountry] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [weatherData, setWeatherData] = useState({
    temperature: 0,
    temperatureMax: 0,
    temperatureMin: 0,
    elevation: 0,
    windSpeed: 0,
    humidity: 0,
    timezone: '',
    icon: "https://openweathermap.org/img/wn/",
    isDay: new Date().getHours() >= 6 && new Date().getHours() < 18, // Default based on local time
  });

  const { addPlace } = useMarkersStore();

  const handleSearch = async (query: string, lat?: number, lon?: number) => {
    try {
      if (lat !== undefined && lon !== undefined) {
        // If we have coordinates, use them directly
        await handleMarkerClick([lat, lon]);
      } else {
        // Otherwise, search by name
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
        const data = await response.json();
        
        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          await handleMarkerClick([parseFloat(lat), parseFloat(lon)]);
        }
      }
    } catch (error) {
      console.error('Error searching location:', error);
    }
  };

  const handleAddToFavorites = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!placeName || markers.length === 0) return;
    
    addPlace({
      name: placeName,
      country: country,
      temperature: weatherData.temperature.toString(),
      temperatureMin: weatherData.temperatureMin,
      temperatureMax: weatherData.temperatureMax,
      weather: weatherData.isDay ? 'day' : 'night',
      lat: markers[0][0],
      lon: markers[0][1]
    });
  };

  const handleMarkerClick = async (position: [number, number]) => {
    setMarkers([position]);
    
    try {
      // Get place name
      const placeData = await fetchPlacesDataCoordinates(position[0], position[1]);
      if (placeData && typeof placeData.city === 'string') {
        setPlaceName(placeData.city);
      }

      // Set country from placeData
      if (placeData && placeData.country) {
        setCountry(placeData.country);
      }

      // Get weather data
      const weatherResponse = await fetchWeatherDataCelcius(position);
      
      // Get daily data for min/max temperatures
      const today = new Date();
      const todayStr = today.toISOString().split('T')[0];
      const todayIndex = weatherResponse.hourly.time.findIndex((time: string) => 
        time.startsWith(todayStr)
      );
      
      // Get min/max temperatures for today
      const todayTemps = weatherResponse.hourly.temperature_2m.slice(todayIndex, todayIndex + 24);
      const temperatureMin = Math.min(...todayTemps);
      const temperatureMax = Math.max(...todayTemps);
      
      setWeatherData({
        elevation: weatherResponse.elevation,
        temperature: weatherResponse.current_weather.temperature,
        temperatureMax: temperatureMax,
        temperatureMin: temperatureMin,
        windSpeed: weatherResponse.current_weather.windspeed,
        humidity: weatherResponse.hourly.relativehumidity_2m[todayIndex] || 0,
        timezone: weatherResponse.timezone,
        icon: weatherResponse.current_weather.icon,
        isDay: weatherResponse.current_weather.isDay,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


    return (
        <StoreProvider>
            <div className="flex h-screen bg-gray-100">
                <Sidebar onSearch={handleSearch} />
                
                {/* Map Container - Takes remaining space */}
                <div className="flex-1 p-4">
                    <div className="h-full bg-white rounded-2xl overflow-hidden shadow-md">
                        <Map onMarkerClick={handleMarkerClick} />
                    </div>
                </div>

                {/* Right Sidebar with Weather Info */}
                <CurrentWeather 
                  country={country}
                  placeName={placeName} 
                  elevation={Number(weatherData.elevation)} 
                  temperature={Number(weatherData.temperature)}
                  temperatureMax={weatherData.temperatureMax}
                  temperatureMin={weatherData.temperatureMin}
                  humidity={weatherData.humidity}
                  timezone={weatherData.timezone}
                  windSpeed={Number(weatherData.windSpeed)} 
                  isDay={weatherData.isDay} 
                  onAdd={handleAddToFavorites} 
                />
            </div>
        </StoreProvider>
    )
}
