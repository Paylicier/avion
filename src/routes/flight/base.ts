import { getFlight } from "../../services/flightaware";
import { LoggedFlight } from "../../services/types/flightaware";

export const route = {
    method: 'GET',
    path: '/flight/:flightId'
};

// get base info for latest flight w/ this code.

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

    const flightData = (await getFlight(flightId.split('-')[0]))?.flights;
    const firstKey = flightData ? Object.keys(flightData)[0] : undefined;
    let flight: LoggedFlight | undefined = firstKey ? flightData[firstKey] : undefined;

    if (flightId.includes('-')) {
        const internalId = flightId.split('-').slice(1).join('-');
        flight = flightData ? flight?.activityLog.flights.find(f => {
            const candidateInternalId = `${flightId.split('-')[0]}-${f.flightId.split('-')[1] ?? f.flightId}`;
            return f.encryptedFlightId.slice(0, 8) === internalId || candidateInternalId === flightId || f.flightId === internalId;
        }) : undefined;
    }

    const baseData = flight ? {
        "id": flight.ident ?? flight.flightId.split('-')[0],
        "internalId": `${flightId.split('-')[0]}-${flight.flightId.split('-')[1]}`,
        "status": flight.flightStatus,
        "cancelled": flight.cancelled,
        "diverted": flight.diverted,
        "airline": {
            "name": flight.airline?.fullName ?? flightData[firstKey].airline.fullName,
            "icao": flight.airline?.icao ?? flightData[firstKey].airline.icao,
            "iata": flight.airline?.iata ?? flightData[firstKey].airline.iata
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