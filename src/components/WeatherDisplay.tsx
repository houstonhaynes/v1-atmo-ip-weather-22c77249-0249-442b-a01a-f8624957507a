import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { WeatherCard, WeatherCardSkeleton } from './WeatherCard';
import { ForecastItem, ForecastItemSkeleton } from './ForecastItem';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import type { WeatherData } from '@/lib/weather';
import { useTemperature } from '@/hooks/use-temperature';
type WeatherState = {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
};
export function WeatherDisplay() {
  const [state, setState] = useState<WeatherState>({
    data: null,
    loading: true,
    error: null,
  });
  const { unit, toggleUnit } = useTemperature();
  const fetchWeather = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const response = await fetch('/api/weather');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      const data: WeatherData = await response.json();
      setState({ data, loading: false, error: null });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      console.error("Failed to fetch weather:", errorMessage);
      setState({ data: null, loading: false, error: errorMessage });
    }
  }, []);
  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="space-y-12">
        <div className="flex justify-center">
          <div className="flex items-center space-x-3">
            <Label htmlFor="temp-unit" className="font-semibold text-slate-300 text-lg">°C</Label>
            <Switch
              id="temp-unit"
              checked={unit === 'F'}
              onCheckedChange={toggleUnit}
              aria-label="Toggle temperature unit"
            />
            <Label htmlFor="temp-unit" className="font-semibold text-slate-300 text-lg">°F</Label>
          </div>
        </div>
        <AnimatePresence mode="wait">
          {state.loading ? (
            <motion.div key="loading" exit={{ opacity: 0 }}>
              <div className="flex flex-col items-center space-y-12">
                <WeatherCardSkeleton />
                <div className="w-full">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <ForecastItemSkeleton key={i} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : state.error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center text-center text-white bg-red-500/20 p-8 rounded-2xl"
            >
              <AlertTriangle className="w-12 h-12 text-red-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Something went wrong</h3>
              <p className="text-red-300 mb-6 max-w-sm">{state.error}</p>
              <Button
                onClick={fetchWeather}
                className="bg-white/90 text-brand-darkest hover:bg-white transition-colors hover:scale-105 active:scale-95"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            </motion.div>
          ) : state.data ? (
            <motion.div key="data" exit={{ opacity: 0 }}>
              <div className="flex flex-col items-center space-y-12">
                <WeatherCard data={state.data} unit={unit} />
                <div className="w-full">
                  <h3 className="text-2xl font-bold text-white text-center mb-6">
                    5-Day Forecast
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {state.data.forecast.map((day, i) => (
                      <ForecastItem key={day.date} {...day} unit={unit} index={i} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}