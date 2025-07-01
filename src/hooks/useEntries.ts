import { useState, useEffect } from 'react';
import { DailyEntry } from '../types';
import { useLocalStorage } from './useLocalStorage';

export function useEntries() {
  const [entries, setEntries] = useLocalStorage<DailyEntry[]>('micromind-entries', []);
  const [currentEntry, setCurrentEntry] = useState<DailyEntry | null>(null);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    // Initialize with a new empty entry
    setCurrentEntry({
      id: generateId(),
      date: today,
      learned: '',
      question: '',
      idea: '',
      timestamp: Date.now()
    });
  }, [today]);

  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const saveEntry = (entry: DailyEntry) => {
    // Only save if there's actual content
    const hasContent = entry.learned.trim() || entry.question.trim() || entry.idea.trim();
    if (!hasContent) return;

    const updatedEntries = entries.filter(e => e.id !== entry.id);
    updatedEntries.push({ ...entry, timestamp: Date.now() });
    setEntries(updatedEntries.sort((a, b) => b.timestamp - a.timestamp));
  };

  const deleteEntry = (entryId: string) => {
    const updatedEntries = entries.filter(e => e.id !== entryId);
    setEntries(updatedEntries);
  };

  const createNewEntry = () => {
    const newEntry = {
      id: generateId(),
      date: today,
      learned: '',
      question: '',
      idea: '',
      timestamp: Date.now()
    };
    setCurrentEntry(newEntry);
    return newEntry;
  };

  const getStreak = () => {
    if (entries.length === 0) return 0;
    
    const uniqueDates = [...new Set(entries.map(e => e.date))].sort((a, b) => b.localeCompare(a));
    let streak = 0;
    let currentDate = new Date();
    
    for (const dateStr of uniqueDates) {
      const entryDate = new Date(dateStr);
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
    currentEntry,
    setCurrentEntry,
    saveEntry,
    deleteEntry,
    createNewEntry,
    getStreak: getStreak()
  };
}