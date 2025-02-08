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
    const urlBase = "https://api.open-meteo.com/v1/forecast?";
    const restData = 'latitude=' + latLong[0] + '&longitude=' + latLong[1] + '&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m&forecast_days=1'
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
    const urlBase = "https://api.open-meteo.com/v1/forecast?";
    const restData = 'latitude=' + Number(latLong[0]) + '&longitude=' + Number(latLong[1]) + '&temperature_unit=fahrenheit&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m&forecast_days=1'
    const finalReq = urlBase + restData;

    try {

        const response = await fetch(finalReq);

        const jsonData = await response.json();
        return (jsonData);

    } catch (error) {

        console.error('Error fetching data:', error);

    }
};

/**
 * 
 * @param input string: Describe the location to search
 * @returns Promise: JSON with lat and long Location data from the Nominatim API
 */
export const fetchPlacesData = async (input: string) => {
    const urlBase = "https://nominatim.openstreetmap.org/search?format=json&q=";
    const restData = input;
    const finalReq = urlBase + restData + '&addressdetails=1';

    try {

        const response = await fetch(finalReq);

        const jsonData = await response.json();
        const coords = { "lat": Number(jsonData[0].lat), "long": Number(jsonData[0].lon), "name": jsonData[0].address.city }
        console.log(coords)
        return coords

    } catch (error) {

        console.error('Error fetching data:', error);

    }
};

/**
 * 
 * @param input string: Describe the lat and lon of location to search
 * @returns Promise: JSON with Location data from the Nominatim API
 */
export const fetchPlacesDataCoordinates = async (lat: number, lon: number) => {
    const urlBase = "https://nominatim.openstreetmap.org/search?format=json&q=";
    const restData = lat + '%2C' + lon + '&addressdetails=1';
    const finalReq = urlBase + restData;

    try {

        const response = await fetch(finalReq);
        const jsonData = await response.json();

        if (!jsonData[0].address.city) {
            const coords = { "lat": Number(jsonData[0].lat), "long": Number(jsonData[0].lon), "city": jsonData[0].address.town }
            console.log(coords)
            return coords
        } else {
            if (!jsonData[0].address.town) {
                const coords = { "lat": Number(jsonData[0].lat), "long": Number(jsonData[0].lon), "city": jsonData[0].address.city }
                console.log(coords)
                return coords
            }
        }


    } catch (error) {
        console.error('Error fetching data:', error);
        const coords = { "lat": 0, "long": 0, "city": "Not Found" }
        console.log(coords)
        return coords

    }
};