import {
  Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudFog, CloudDrizzle, CloudSun, Haze, LucideProps
} from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
export interface CurrentWeather {
  temperature: number;
  weatherCode: number;
}
export interface DailyForecast {
  date: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
}
export interface WeatherData {
  location: string;
  current: CurrentWeather;
  forecast: DailyForecast[];
}
export interface WeatherCondition {
  description: string;
  Icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
}
const weatherCodeMap: Record<number, WeatherCondition> = {
  0: { description: 'Clear Sky', Icon: Sun },
  1: { description: 'Mainly Clear', Icon: CloudSun },
  2: { description: 'Partly Cloudy', Icon: Cloud },
  3: { description: 'Overcast', Icon: Cloud },
  45: { description: 'Fog', Icon: CloudFog },
  48: { description: 'Depositing Rime Fog', Icon: CloudFog },
  51: { description: 'Light Drizzle', Icon: CloudDrizzle },
  53: { description: 'Moderate Drizzle', Icon: CloudDrizzle },
  55: { description: 'Dense Drizzle', Icon: CloudDrizzle },
  56: { description: 'Light Freezing Drizzle', Icon: CloudDrizzle },
  57: { description: 'Dense Freezing Drizzle', Icon: CloudDrizzle },
  61: { description: 'Slight Rain', Icon: CloudRain },
  63: { description: 'Moderate Rain', Icon: CloudRain },
  65: { description: 'Heavy Rain', Icon: CloudRain },
  66: { description: 'Light Freezing Rain', Icon: CloudRain },
  67: { description: 'Heavy Freezing Rain', Icon: CloudRain },
  71: { description: 'Slight Snowfall', Icon: CloudSnow },
  73: { description: 'Moderate Snowfall', Icon: CloudSnow },
  75: { description: 'Heavy Snowfall', Icon: CloudSnow },
  77: { description: 'Snow Grains', Icon: CloudSnow },
  80: { description: 'Slight Rain Showers', Icon: CloudRain },
  81: { description: 'Moderate Rain Showers', Icon: CloudRain },
  82: { description: 'Violent Rain Showers', Icon: CloudRain },
  85: { description: 'Slight Snow Showers', Icon: CloudSnow },
  86: { description: 'Heavy Snow Showers', Icon: CloudSnow },
  95: { description: 'Thunderstorm', Icon: CloudLightning },
  96: { description: 'Thunderstorm with Slight Hail', Icon: CloudLightning },
  99: { description: 'Thunderstorm with Heavy Hail', Icon: CloudLightning },
};
export const mapWeatherCode = (code: number): WeatherCondition => {
  return weatherCodeMap[code] || { description: 'Unknown', Icon: Haze };
};
/**
 * Converts a temperature from Celsius to Fahrenheit.
 * @param celsius The temperature in Celsius.
 * @returns The temperature in Fahrenheit, rounded to the nearest integer.
 */
export const convertCelsiusToFahrenheit = (celsius: number): number => {
  return Math.round((celsius * 9) / 5 + 32);
};