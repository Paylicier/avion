import type { FlightAwareResponse } from "./types/flightaware";

const BASE_URL = 'https://flightaware.com/';

export const getFlight = async (flightId: string): Promise<FlightAwareResponse | null> => {
    const url = `${BASE_URL}live/flight/${flightId}`;
    const response = await fetch(url);
    const html = await response.text();

    return parseFlightData(html);
}

const parseFlightData = (html: string): FlightAwareResponse | null => {
    const regex = new RegExp('var\\s+trackpollBootstrap\\s*=\\s*(\\{.*\\})');
    const match = html.match(regex);    
    if (match && match[1]) {
        if (match[1].includes('"unknown":true')) return null; // ugly way to check if the flight exists
        return JSON.parse(match[1]);
    }
    return null;
};