import { getCurrentWeather, type WeatherCurrent } from "@suntimes/shared";

const REGION_STATIONS: Record<string, string> = {
  brisbane: "IDQ65388",
  "gold-coast": "IDQ65395",
  "sunshine-coast": "IDQ65362",
  "tropical-north-qld": "IDQ65268",
  whitsundays: "IDQ65316",
  "fraser-coast": "IDQ65354",
  "outback-qld": "IDQ65404",
};

export async function getWeatherForRegion(
  regionId: string
): Promise<WeatherCurrent | null> {
  const stationId = REGION_STATIONS[regionId];
  if (!stationId) return null;
  return getCurrentWeather(stationId);
}

export function formatWeatherForTweet(weather: WeatherCurrent): string {
  return `${weather.temp}°C and ${weather.condition.toLowerCase()} in ${weather.stationName}`;
}
