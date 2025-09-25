import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { mapWeatherCode, WeatherData, convertCelsiusToFahrenheit } from '@/lib/weather';
import { Skeleton } from '@/components/ui/skeleton';
import { TemperatureUnit } from '@/hooks/use-temperature';
interface WeatherCardProps {
  data: WeatherData;
  unit: TemperatureUnit;
}
export function WeatherCard({ data, unit }: WeatherCardProps) {
  const { description, Icon } = mapWeatherCode(data.current.weatherCode);
  const displayTemp = unit === 'C' ? data.current.temperature : convertCelsiusToFahrenheit(data.current.temperature);
  return (
    <motion.div
      className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-3xl p-8 text-white shadow-lg border border-white/20"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-slate-300" />
            <h2 className="text-2xl font-bold">{data.location}</h2>
          </div>
          <p className="text-slate-300 text-lg">{description}</p>
        </div>
        <Icon className="w-20 h-20" />
      </div>
      <div className="mt-8 text-center">
        <p className="text-8xl font-bold tracking-tighter">
          {displayTemp}°
        </p>
      </div>
    </motion.div>
  );
}
export function WeatherCardSkeleton() {
  return (
    <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-3xl p-8 text-white shadow-lg border border-white/20">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-8 w-40 rounded-md" />
          </div>
          <Skeleton className="h-7 w-32 mt-2 rounded-md" />
        </div>
        <Skeleton className="h-20 w-20 rounded-full" />
      </div>
      <div className="mt-8 flex justify-center">
        <Skeleton className="h-24 w-40 rounded-md" />
      </div>
    </div>
  );
}