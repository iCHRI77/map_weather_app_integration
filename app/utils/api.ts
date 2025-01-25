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
        return (jsonData);

    } catch (error) {

        console.error('Error fetching data:', error);

    }
};

/**
 * 
 * @param input String: Describe the location to search
 * @returns Promise: JSON with lat and long Location data from the Nominatim API
 */
export const fetchPlacesData = async (input: String) => {
    let urlBase = "https://nominatim.openstreetmap.org/search?format=json&q=";
    let restData = input;
    const finalReq = urlBase + restData + '&addressdetails=1';

    try {

        const response = await fetch(finalReq);

        const jsonData = await response.json();
        let coords = { "lat": Number(jsonData[0].lat), "long": Number(jsonData[0].lon), "name": jsonData[0].address.city }
        console.log(coords)
        return coords

    } catch (error) {

        console.error('Error fetching data:', error);

    }
};

/**
 * 
 * @param input String: Describe the lat and lon of location to search
 * @returns Promise: JSON with Location data from the Nominatim API
 */
export const fetchPlacesDataCoordinates = async (lat: Number, lon: Number) => {
    let urlBase = "https://nominatim.openstreetmap.org/search?format=json&q=";
    let restData = lat + '%2C' + lon + '&addressdetails=1';
    const finalReq = urlBase + restData;

    try {

        const response = await fetch(finalReq);

        const jsonData = await response.json();
        console.log(jsonData)
        let coords = { "lat": Number(jsonData[0].lat), "long": Number(jsonData[0].lon), "name": jsonData[0].address.city }
        console.log(coords)
        return coords

    } catch (error) {

        console.error('Error fetching data:', error);

    }
};