import { useState, useEffect } from 'react';
import { DailyEntry } from '../types';
import { useLocalStorage } from './useLocalStorage';

export function useEntries() {
  const [entries, setEntries] = useLocalStorage<DailyEntry[]>('micromind-entries', []);
  const [todaysEntry, setTodaysEntry] = useState<DailyEntry | null>(null);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const existing = entries.find(entry => entry.date === today);
    if (existing) {
      setTodaysEntry(existing);
    } else {
      setTodaysEntry({
        date: today,
        learned: '',
        question: '',
        idea: '',
        timestamp: Date.now()
      });
    }
  }, [entries, today]);

  const saveEntry = (entry: DailyEntry) => {
    const updatedEntries = entries.filter(e => e.date !== entry.date);
    updatedEntries.push({ ...entry, timestamp: Date.now() });
    setEntries(updatedEntries.sort((a, b) => b.date.localeCompare(a.date)));
    setTodaysEntry(entry);
  };

  const getStreak = () => {
    if (entries.length === 0) return 0;
    
    const sortedEntries = [...entries].sort((a, b) => b.date.localeCompare(a.date));
    let streak = 0;
    let currentDate = new Date();
    
    for (const entry of sortedEntries) {
      const entryDate = new Date(entry.date);
      const daysDiff = Math.floor((currentDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === streak) {
        streak++;
        currentDate = entryDate;
      } else {
        break;
      }
    }
    
    return streak;
  };

  return {
    entries,
    todaysEntry,
    saveEntry,
    getStreak: getStreak()
  };
}