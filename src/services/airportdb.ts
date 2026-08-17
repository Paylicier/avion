const BASE_URL = 'https://airportdb.io/api/v1/';
const API_KEY = "3538c6f223444e3aef8deab4d9f2848774beb8f5944fd1404d1bf7bc36c0e5e36d394e9fc95a63126d65e0aeda2e9b18";

export const getAirport = async (icaoCode: string): Promise<any | null> => {
    const url = `${BASE_URL}airport/${icaoCode}?apiToken=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    return data;
}

