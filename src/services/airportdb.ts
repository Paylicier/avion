const BASE_URL = 'https://airportdb.io/api/v1/';
const API_KEY = "";

export const getAirport = async (icaoCode: string): Promise<any | null> => {
    const url = `${BASE_URL}airport/${icaoCode}?apiToken=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    return data;
}

