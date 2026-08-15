import type { FlightAwareResponse } from "./types/flightaware";

const BASE_URL = 'https://flightaware.com/';

export const getFlight = async (flightId: string): Promise<FlightAwareResponse | null> => {
    const url = `${BASE_URL}live/flight/${flightId}`;
    const response = await fetch(url);
    const html = await response.text();

    return parseFlightData(html);
}

export const getAirport = async (airportCode: string): Promise<any | null> => {
    const url = `${BASE_URL}live/airport/${airportCode}`;
    const response = await fetch(url);
    const html = await response.text();

    return {
        "inbound": await parseInboundFlightsData(html),
        "outbound": await parseOutboundFlightsData(html)
    };
}

const parseInboundFlightsData = async (html: string): Promise<any | null> => {
    const regex = new RegExp('inbound_tailsequence\\s*=\\s*(\\[[\\s\\S]*?\\])');
    const match = html.match(regex);    
    if (match && match[1]) {
        return JSON.parse(match[1]);
    }
    return null;
};

const parseOutboundFlightsData = async (html: string): Promise<any | null> => {
    const regex = new RegExp('outbound_tailsequence\\s*=\\s*(\\[[\\s\\S]*?\\])');
    const match = html.match(regex);    
    if (match && match[1]) {
        return JSON.parse(match[1]);
    }
    return null;
};

const parseFlightData = (html: string): FlightAwareResponse | null => {
    const regex = new RegExp('var\\s+trackpollBootstrap\\s*=\\s*(\\{.*\\})');
    const match = html.match(regex);    
    if (match && match[1]) {
        if (match[1].includes('"unknown":true')) return null; // ugly way to check if the flight exists
        return JSON.parse(match[1]);
    }
    return null;
};