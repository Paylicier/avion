const BASE_URL = "https://api.adsb.lol/v2/";

export const getPlaneFromCallsign = async (callsign: string) => {
    const url = `${BASE_URL}callsign/${callsign}`;
    const response = await fetch(url);
    return (await response.json())?.ac?.[0] ?? null;
};