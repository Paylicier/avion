import { getFlight } from "../../services/flightaware";

export const route = {
    method: 'GET',
    path: '/flight/:flightId/raw'
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

    let flightData = (await getFlight(flightId))?.flights;

    if (flightId.includes('-')) {
        const internalId = flightId.split('-').slice(1).join('-');
        const firstKey = flightData ? Object.keys(flightData)[0] : undefined;
        const flight = firstKey ? flightData[firstKey] : undefined;
        flightData = flight ? {
            [firstKey]: {
                ...flight,
                activityLog: {
                    flights: flight.activityLog.flights.filter(f => {
                        const candidateInternalId = `${flightId.split('-')[0]}-${f.flightId.split('-')[1] ?? f.flightId}`;
                        return f.encryptedFlightId.slice(0, 8) === internalId || candidateInternalId === flightId || f.flightId === internalId;
                    })
                }
            }
        } : undefined;
    }

    if (flightData) {
        return new Response(JSON.stringify(flightData), {
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