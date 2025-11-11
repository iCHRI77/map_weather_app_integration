import { FiMapPin, FiThermometer, FiWind, FiPlusCircle, FiDroplet } from 'react-icons/fi';
import NotificationToast from "../components/notificationToast";
import { FaHome } from 'react-icons/fa';

interface CurrentWeatherProps {
    country: string;
    placeName: string;
    elevation: number;
    temperature: number;
    temperatureMax?: number;
    temperatureMin?: number;
    humidity?: number;
    timezone?: string;
    windSpeed: number;
    isDay: boolean;
    onAdd: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function CurrentWeather({     

    country,
    placeName, 
    elevation, 
    temperature, 
    temperatureMax, 
    temperatureMin, 
    humidity,
    windSpeed, 
    onAdd 


    
}: CurrentWeatherProps) {




    return (
        <div className="w-96 m-4 h-auto bg-white shadow-lg rounded-xl flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-5 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <FiMapPin className="mr-2 text-blue-500" />
                        <h2 className="text-xl font-semibold">
                            {placeName ? `${placeName}${country ? ', ' + country : ''}` : 'Select a location'}
                        </h2>
                    </div>
                </div>  
            </div>

            {/* Current Temperature */}
            <div className="p-6 text-center">
                <div className="text-5xl font-bold text-gray-800">
                    {Math.round(temperature)}°C
                </div>
                <div className="text-gray-500 text-sm mt-1">
                    {temperatureMax !== undefined && temperatureMin !== undefined && (
                        <span>H: {Math.round(temperatureMax)}° L: {Math.round(temperatureMin)}°</span>
                    )}
                </div>
            </div>

            {/* Weather Details */}
            <div className="px-6 py-2">
                <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <div className="flex items-center">
                            <FiThermometer className="text-blue-500 mr-3" />
                            <span className="text-gray-600">Feels Like</span>
                        </div>
                        <span className="font-medium">{Math.round(temperature + 2)}°C</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <div className="flex items-center">
                            <FiDroplet className="text-blue-500 mr-3" />
                            <span className="text-gray-600">Humidity</span>
                        </div>
                        <span className="font-medium">{humidity !== undefined ? `${humidity}%` : '--'}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <div className="flex items-center">
                            <FiWind className="text-blue-500 mr-3" />
                            <span className="text-gray-600">Wind Speed</span>
                        </div>
                        <span className="font-medium">{Math.round(windSpeed)} km/h</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                            <FaHome className="text-blue-500 mr-3" />
                            <span className="text-gray-600">Elevation</span>
                        </div>
                        <span className="font-medium">{Math.round(elevation)} m</span>
                    </div>
                </div>
            </div>

            {/* Action Button */}
            <div className="p-4 border-t border-gray-200 mt-auto">
                <button
                    onClick={(e) => {
                        onAdd(e);
                        NotificationToast(placeName);
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                >
                    <FiPlusCircle />
                    Add to Favorites
                </button>
            </div>
        </div>
    );
};