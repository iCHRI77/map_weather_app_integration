/**
 * Description: This is the API file that will contain all the API calls to Weather API
 * Author: Christian J Barbosa B
 * Date: 2025-01-22
 */

/**
 * 
 * @param lat Number: Describe the Latitude of the location
 * @param long Number: Describe the Longitude of the location
 * @returns Promise: JSON Weather data from the open-meteo API in Celcius degrees
 */
export const fetchWeatherDataCelcius = async (latLong: [number, number]) => {
    let urlBase = "https://api.open-meteo.com/v1/forecast?";
    let restData = 'latitude=' + latLong[0] + '&longitude=' + latLong[1] + '&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m&forecast_days=1'
    const finalReq = urlBase + restData;

    try {

        const response = await fetch(finalReq);

        const jsonData = await response.json();
        console.log(jsonData)
        return (jsonData);

    } catch (error) {

        console.error('Error fetching data:', error);

    }
};

/**
 * 
 * @param lat Number: Describe the Latitude of the location
 * @param long Number: Describe the Longitude of the location
 * @returns Promise: JSON Weather data from the open-meteo API in Fahrenheit degrees
 */
export const fetchWeatherDataFahrenheit = async (latLong: [number, number]) => {
    let urlBase = "https://api.open-meteo.com/v1/forecast?";
    let restData = 'latitude=' + Number(latLong[0]) + '&longitude=' + Number(latLong[1]) + '&temperature_unit=fahrenheit&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m&forecast_days=1'
    const finalReq = urlBase + restData;

    try {

        const response = await fetch(finalReq);

        const jsonData = await response.json();
        console.log(jsonData)
        return (jsonData);

    } catch (error) {

        console.error('Error fetching data:', error);

    }
};

