import { getFlight } from "../services/flightaware";

export const route = {
    method: 'GET',
    path: '/'
};

export default async function handler(request: Request, env: Env, ctx: ExecutionContext, params: Record<string, string> = {}): Promise<Response> {

    const testFlightId = 'DAL67';

    const flightData = await getFlight(testFlightId);

    if (flightData) {
        return new Response("{ \"status\": \"success\" }", {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    return new Response("{ \"status\": \"error\" }", {
        status: 500,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}