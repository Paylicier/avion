import { getAirport } from "../../services/flightaware";
import { getAirport as getAirportInfo } from "../../services/airportdb";
import { getMainImageFromPage } from "../../services/wikipedia"

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

    if(airportCode.length !== 4) {
        return new Response("{ \"status\": \"error\", \"message\": \"airportCode needs to be icao code\" }", {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    let airportPlanes = (await getAirport(airportCode));

    let airportInfo = await getAirportInfo(airportCode);

    airportInfo = airportInfo ? {
        name: airportInfo.name,
        iata: airportInfo.iata_code,
        icao: airportInfo.icao_code,
        city: airportInfo.municipality,
        country: airportInfo.iso_country,
        lat: airportInfo.latitude_deg,
        lon: airportInfo.longitude_deg,
        elevation: airportInfo.elevation_ft,
        link: airportInfo.home_link,
        wikipedia: airportInfo.wikipedia_link,
        image: await getMainImageFromPage(airportInfo.wikipedia_link)
    } : null;

    airportPlanes = { ...airportInfo, ...airportPlanes };

    if (airportPlanes) {
        return new Response(JSON.stringify(airportPlanes), {
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