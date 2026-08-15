import { getAirport } from "../../services/flightaware";

export const route = {
    method: 'GET',
    path: '/airport/:airportCode'
};

export default async function handler(request: Request, env: Env, ctx: ExecutionContext, params: Record<string, string> = {}): Promise<Response> {
    const airportCode = params.airportCode;

    if (!airportCode) {
        return new Response("{ \"status\": \"error\", \"message\": \"missing airportCode parameter\" }", {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    let airportData = (await getAirport(airportCode));

    if (airportData) {
        return new Response(JSON.stringify(airportData), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    return new Response("{ \"status\": \"error\", \"message\": \"looks like this airport doesn't exist\" }", {
        status: 404,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}