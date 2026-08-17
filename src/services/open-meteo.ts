const BASE_URL = "https://api.open-meteo.com/v1"

export const getWeatherFromLatLon = async (lat: float, lon: float): any => {
    const req = await fetch(`${BASE_URL}/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,is_day,rain,wind_speed_10m,wind_direction_10m,precipitation&timeformat=unixtime`)

    const data = (await req.json()) ?? null;

    return data;
}