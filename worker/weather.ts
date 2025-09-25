import { Context } from 'hono';
import { z } from 'zod';
// Zod schema for validating the Open-Meteo API response
const WeatherApiSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  current: z.object({
    time: z.string(),
    temperature_2m: z.number(),
    weather_code: z.number(),
  }),
  daily: z.object({
    time: z.array(z.string()),
    weather_code: z.array(z.number()),
    temperature_2m_max: z.array(z.number()),
    temperature_2m_min: z.array(z.number()),
  }),
});
export const handleWeatherRequest = async (c: Context) => {
  try {
    const cf = c.req.raw.cf;
    if (typeof cf !== 'object' || cf === null) {
      return c.json({ error: 'Could not determine location. Geolocation data not available.' }, 400);
    }
    const { latitude, longitude, city } = cf as { latitude?: string; longitude?: string; city?: string };
    if (!latitude || !longitude) {
      return c.json({ error: 'Could not determine location. Latitude or longitude missing.' }, 400);
    }
    const weatherApiUrl = new URL('https://api.open-meteo.com/v1/forecast');
    weatherApiUrl.searchParams.set('latitude', latitude);
    weatherApiUrl.searchParams.set('longitude', longitude);
    weatherApiUrl.searchParams.set('current', 'temperature_2m,weather_code');
    weatherApiUrl.searchParams.set('daily', 'weather_code,temperature_2m_max,temperature_2m_min');
    weatherApiUrl.searchParams.set('timezone', 'auto');
    weatherApiUrl.searchParams.set('forecast_days', '6'); // 5-day forecast + today
    const response = await fetch(weatherApiUrl.toString(), {
      headers: { 'User-Agent': 'AtmoIPWeather/1.0' },
    });
    if (!response.ok) {
      console.error(`Open-Meteo API error: ${response.status} ${response.statusText}`);
      return c.json({ error: 'Failed to fetch weather data.' }, 502);
    }
    const rawData = await response.json();
    const parsedData = WeatherApiSchema.safeParse(rawData);
    if (!parsedData.success) {
      console.error('Failed to parse weather API response:', parsedData.error);
      return c.json({ error: 'Invalid data received from weather service.' }, 500);
    }
    const data = parsedData.data;
    const transformedData = {
      location: city || 'Your Location',
      current: {
        temperature: Math.round(data.current.temperature_2m),
        weatherCode: data.current.weather_code,
      },
      forecast: data.daily.time.slice(1).map((date, index) => ({ // slice(1) to get next 5 days
        date,
        weatherCode: data.daily.weather_code[index + 1],
        tempMax: Math.round(data.daily.temperature_2m_max[index + 1]),
        tempMin: Math.round(data.daily.temperature_2m_min[index + 1]),
      })),
    };
    return c.json(transformedData, 200, {
      'Cache-Control': 'public, max-age=600', // Cache for 10 minutes
    });
  } catch (error) {
    console.error('Error in handleWeatherRequest:', error);
    return c.json({ error: 'An internal server error occurred.' }, 500);
  }
};