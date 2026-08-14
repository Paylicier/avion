import { getFlight } from "../../services/flightaware";

export const route = {
    method: 'GET',
    path: '/flight/:flightId'
};

export default async function handler(request: Request, env: Env, ctx: ExecutionContext, params: Record<string, string> = {}): Promise<Response> {
    const flightId = params.flightId;

    if (!flightId) {
        return new Response("{ \"status\": \"error\", \"message\": \"missing flightId parameter\" }", {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    const flightData = (await getFlight(flightId))?.flights;
    const firstKey = flightData ? Object.keys(flightData)[0] : undefined;
    const flight = firstKey ? flightData[firstKey] : undefined;

    const baseData = flight ? {
        "id": flight.ident,
        "status": flight.flightStatus,
        "cancelled": flight.cancelled,
        "diverted": flight.diverted,
        "airline": {
            "name": flight.airline.fullName,
            "icao": flight.airline.icao,
            "iata": flight.airline.iata
        },
        "origin": {
            "name": flight.origin.friendlyName,
            "icao": flight.origin.icao,
            "iata": flight.origin.iata,
            "lat": flight.origin.coord[1],
            "lon": flight.origin.coord[0],
            "location": flight.origin.friendlyLocation,
            "terminal": flight.origin.terminal,
            "gate": flight.origin.gate
        },
        "destination": {
            "name": flight.destination.friendlyName,
            "icao": flight.destination.icao,
            "iata": flight.destination.iata,
            "lat": flight.destination.coord[1],
            "lon": flight.destination.coord[0],
            "location": flight.destination.friendlyLocation,
            "terminal": flight.destination.terminal,
            "gate": flight.destination.gate
        },
        "aircraft": flight.aircraft,
        "times": {
            "gateDeparture": flight.gateDepartureTimes,
            "takeoff": flight.takeoffTimes,
            "landing": flight.landingTimes,
            "gateArrival": flight.gateArrivalTimes
        }
    } : undefined;

    if (flightData) {
        return new Response(JSON.stringify(baseData), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    return new Response("{ \"status\": \"error\", \"message\": \"looks like this flight doesn't exist\" }", {
        status: 404,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}