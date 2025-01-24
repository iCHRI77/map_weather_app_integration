interface CurrentWeatherProps {
    icon: string;
    elevation: number;
    temperature: number;
    windSpeed: number;
    isDay: boolean;
    onAdd: Function;
}

export default function CurrentWeather({ icon, elevation, temperature, windSpeed, isDay, onAdd }: CurrentWeatherProps) {
    return (
        <>
            <div>
                <div className="grid grid-cols-2 gap-4 bg-[#272727]" style={{ width: '300px', height: '300px', padding: '20px', boxSizing: 'border-box' }}>

                    <div className="flex flex-col text-center my-auto gap-2">
                        <span className="justify-center" style={{ width: '50px', height: '50px' }}>{icon}</span>
                        <span className="justify-center font-bold">Now</span>
                    </div>
                    <div className="flex flex-col text-center my-auto gap-2">
                        <span className="justify-center text-3xl">{temperature}°C</span>
                        <span className="justify-center font-bold">Temperature</span>
                    </div>
                    <div className="flex flex-col text-center my-auto gap-2">
                        <span className="justify-center text-3xl">{elevation}m</span>
                        <span className="justify-center font-bold">Elevation</span>
                    </div>
                    <div className="flex flex-col text-center my-auto gap-2">
                        <span className="justify-center text-3xl">{windSpeed} km/h</span>
                        <span className="justify-center font-bold">Wind Speed</span>
                    </div>
                </div>
                <div className="text-center my-auto p-2 bg-blue-500">{!isDay ? 'Day' : 'Night'}</div>
                <div className="text-center my-2">
                    <button className="text-center p-2 bg-green-500" onClick={onAdd}>add</button>
                </div>
            </div>
        </>
    );
};