import { useState, useEffect, useCallback } from 'react';
export type TemperatureUnit = 'C' | 'F';
const getInitialUnit = (): TemperatureUnit => {
  // Gracefully handle server-side rendering or environments where localStorage is not available.
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return 'C';
  }
  const storedUnit = localStorage.getItem('temperatureUnit');
  // Validate the stored value before returning.
  return storedUnit === 'F' ? 'F' : 'C';
};
export function useTemperature() {
  const [unit, setUnit] = useState<TemperatureUnit>(getInitialUnit);
  useEffect(() => {
    // Persist the selected unit to localStorage whenever it changes.
    localStorage.setItem('temperatureUnit', unit);
  }, [unit]);
  const toggleUnit = useCallback(() => {
    setUnit((prevUnit) => (prevUnit === 'C' ? 'F' : 'C'));
  }, []);
  return { unit, toggleUnit };
}