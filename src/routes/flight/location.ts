import { getFlight } from "../../services/flightaware";
import { getPlaneFromCallsign } from "../../services/adsblol";
import { LoggedFlight } from "../../services/types/flightaware";

export const route = {
    method: 'GET',
    path: '/flight/:flightId/location'
};

// get location info from internal flight id (most recent flight if ident)

export default async function handler(request: Request, env: Env, ctx: ExecutionContext, params: Record<string, string> = {}): Promise<Response> {
    const flightId = params.flightId;

    console.log(`Flight location request for flightId: ${flightId}`);

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

    const plane = await getPlaneFromCallsign(flight?.displayIdent ?? flight?.flightId.split('-')[0] ?? '');

    const locationData = flight ? {
        "status": flight.flightStatus,
        "speed": flight.flightPlan?.speed,
        "altitude": plane?.alt_baro,
        "route": flight.flightPlan?.route,
        "origin": flight.origin?.icao,
        "destination": flight.destination?.icao,
        "hex": plane?.hex,
        "lat": plane?.lat,
        "lon": plane?.lon,
        } : undefined;

    if (locationData) {
        return new Response(JSON.stringify(locationData), {
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