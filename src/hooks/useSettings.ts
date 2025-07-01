import { AppSettings } from '../types';
import { useLocalStorage } from './useLocalStorage';

export function useSettings() {
  const [settings, setSettings] = useLocalStorage<AppSettings>('micromind-settings', {
    darkMode: false,
    lastEntryDate: ''
  });

  const updateLastEntryDate = (date: string) => {
    setSettings(prev => ({ ...prev, lastEntryDate: date }));
  };

  return {
    settings,
    updateLastEntryDate
  };
}