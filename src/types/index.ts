export interface DailyEntry {
  id: string; // Unique identifier for each entry
  date: string; // YYYY-MM-DD format
  learned: string;
  question: string;
  idea: string;
  timestamp: number;
  title?: string; // Optional title for the reflection
}

export interface AppSettings {
  darkMode: boolean;
  lastEntryDate: string;
}