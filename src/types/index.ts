export interface DailyEntry {
  date: string; // YYYY-MM-DD format
  learned: string;
  question: string;
  idea: string;
  timestamp: number;
}

export interface AppSettings {
  darkMode: boolean;
  lastEntryDate: string;
}