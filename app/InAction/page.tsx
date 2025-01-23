import Map from "../components/map"
import { fetchWeatherDataCelcius, fetchWeatherDataFahrenheit } from "../api"


export default function InAction() {
    return (
        <div className="flex flex-row-2">
            <Map />
        </div>
    )
}
