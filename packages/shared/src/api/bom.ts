import { TTLCache } from "./cache";

const CURRENT_TTL = 30 * 60 * 1000; // 30 minutes
const FORECAST_TTL = 3 * 60 * 60 * 1000; // 3 hours

const currentCache = new TTLCache<WeatherCurrent>();
const forecastCache = new TTLCache<WeatherForecastDay[]>();

export interface WeatherCurrent {
  temp: number;
  apparentTemp: number;
  humidity: number;
  windSpeedKmh: number;
  windDirection: string;
  condition: string;
  stationName: string;
}

export interface WeatherForecastDay {
  date: string;
  maxTemp: number;
  minTemp: number;
  condition: string;
  chanceOfRain: number;
}

const FALLBACK_WEATHER: WeatherCurrent = {
  temp: 25,
  apparentTemp: 26,
  humidity: 60,
  windSpeedKmh: 15,
  windDirection: "SE",
  condition: "Partly Cloudy",
  stationName: "Unknown",
};

export async function getCurrentWeather(
  bomStationId: string
): Promise<WeatherCurrent> {
  const cached = currentCache.get(bomStationId);
  if (cached) return cached;

  try {
    // BOM provides JSON feeds for observations
    const url = `http://www.bom.gov.au/fwo/${bomStationId}.json`;
    const res = await fetch(url, {
      headers: { "User-Agent": "Suntimes/1.0" },
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      console.warn(`BOM API returned ${res.status} for ${bomStationId}`);
      return FALLBACK_WEATHER;
    }

    const data = await res.json();
    const observations = data?.observations?.data;

    if (!observations || observations.length === 0) {
      return FALLBACK_WEATHER;
    }

    const latest = observations[0];
    const weather: WeatherCurrent = {
      temp: latest.air_temp ?? 25,
      apparentTemp: latest.apparent_t ?? 26,
      humidity: latest.rel_hum ?? 60,
      windSpeedKmh: latest.wind_spd_kmh ?? 15,
      windDirection: latest.wind_dir ?? "SE",
      condition: deriveCondition(latest),
      stationName: latest.name ?? "Unknown",
    };

    currentCache.set(bomStationId, weather, CURRENT_TTL);
    return weather;
  } catch (error) {
    console.warn(`BOM fetch failed for ${bomStationId}:`, error);
    return FALLBACK_WEATHER;
  }
}

export async function getForecast(
  bomStationId: string
): Promise<WeatherForecastDay[]> {
  const cached = forecastCache.get(bomStationId);
  if (cached) return cached;

  try {
    // BOM forecast endpoint — this is a simplified approach
    // Real implementation would use the full BOM API
    const forecast: WeatherForecastDay[] = [];
    forecastCache.set(bomStationId, forecast, FORECAST_TTL);
    return forecast;
  } catch (error) {
    console.warn(`BOM forecast failed for ${bomStationId}:`, error);
    return [];
  }
}

function deriveCondition(obs: Record<string, unknown>): string {
  const cloud = obs.cloud as string | undefined;
  const rainTrace = obs.rain_trace as string | undefined;

  if (rainTrace && parseFloat(rainTrace) > 0) return "Rainy";
  if (cloud === "Overcast") return "Overcast";
  if (cloud === "Mostly cloudy") return "Mostly Cloudy";
  if (cloud === "Partly cloudy") return "Partly Cloudy";
  return "Sunny";
}
