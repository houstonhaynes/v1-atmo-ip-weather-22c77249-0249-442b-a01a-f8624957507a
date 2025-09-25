import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { mapWeatherCode, convertCelsiusToFahrenheit } from '@/lib/weather';
import { Skeleton } from '@/components/ui/skeleton';
import { TemperatureUnit } from '@/hooks/use-temperature';
interface ForecastItemProps {
  date: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  unit: TemperatureUnit;
  index: number;
}
export function ForecastItem({ date, weatherCode, tempMax, tempMin, unit, index }: ForecastItemProps) {
  const { Icon } = mapWeatherCode(weatherCode);
  const dayOfWeek = format(new Date(date), 'eee');
  const displayTempMax = unit === 'C' ? tempMax : convertCelsiusToFahrenheit(tempMax);
  const displayTempMin = unit === 'C' ? tempMin : convertCelsiusToFahrenheit(tempMin);
  return (
    <motion.div
      className="flex flex-col items-center space-y-2 text-center p-4 bg-white/5 rounded-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.4, ease: 'easeOut' }}
    >
      <p className="font-semibold text-lg text-brand-light">{dayOfWeek}</p>
      <Icon className="w-10 h-10 text-brand-light" />
      <div className="flex items-baseline space-x-1">
        <p className="font-bold text-xl text-white">{displayTempMax}°</p>
        <p className="text-sm text-slate-300">{displayTempMin}°</p>
      </div>
    </motion.div>
  );
}
export function ForecastItemSkeleton() {
  return (
    <div className="flex flex-col items-center space-y-2 text-center p-4 bg-white/5 rounded-2xl">
      <Skeleton className="h-7 w-10 rounded-md" />
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="flex items-baseline space-x-1">
        <Skeleton className="h-7 w-8 rounded-md" />
        <Skeleton className="h-5 w-6 rounded-md" />
      </div>
    </div>
  );
}