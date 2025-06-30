import React, { useState } from 'react';
import { Calendar, ChevronRight, ChevronLeft, BookOpen, HelpCircle, Lightbulb } from 'lucide-react';
import { useEntries } from '../hooks/useEntries';
import { useSettings } from '../hooks/useSettings';
import { DailyEntry } from '../types';

export function History() {
  const { entries } = useEntries();
  const { settings } = useSettings();
  const [selectedEntry, setSelectedEntry] = useState<DailyEntry | null>(null);

  const sortedEntries = [...entries].sort((a, b) => b.date.localeCompare(a.date));
  const totalEntries = entries.length;
  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();
  const thisMonthEntries = entries.filter(entry => {
    const entryDate = new Date(entry.date);
    return entryDate.getMonth() === thisMonth && entryDate.getFullYear() === thisYear;
  }).length;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric'
      });
    }
  };

  if (selectedEntry) {
    return (
      <div className="py-6">
        <div className="flex items-center space-x-3 mb-6">
          <button
            onClick={() => setSelectedEntry(null)}
            className={`p-2 rounded-lg transition-colors ${
              settings.darkMode
                ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                : 'text-stone-500 hover:text-stone-700 hover:bg-stone-100'
            }`}
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h2 className={`text-xl font-semibold ${
              settings.darkMode ? 'text-white' : 'text-stone-900'
            }`}>
              {formatDate(selectedEntry.date)}
            </h2>
            <p className={`text-sm ${
              settings.darkMode ? 'text-slate-300' : 'text-stone-500'
            }`}>
              {new Date(selectedEntry.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className={`p-6 rounded-2xl ${
            settings.darkMode ? 'bg-slate-800' : 'bg-white'
          }`}>
            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-2 rounded-lg ${
                settings.darkMode ? 'bg-emerald-900/30 text-emerald-300' : 'bg-emerald-100 text-emerald-600'
              }`}>
                <BookOpen size={20} />
              </div>
              <h3 className={`font-medium ${
                settings.darkMode ? 'text-white' : 'text-stone-900'
              }`}>What I learned</h3>
            </div>
            <p className={settings.darkMode ? 'text-slate-200' : 'text-stone-700'}>
              {selectedEntry.learned || 'No entry for this day'}
            </p>
          </div>

          <div className={`p-6 rounded-2xl ${
            settings.darkMode ? 'bg-slate-800' : 'bg-white'
          }`}>
            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-2 rounded-lg ${
                settings.darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-600'
              }`}>
                <HelpCircle size={20} />
              </div>
              <h3 className={`font-medium ${
                settings.darkMode ? 'text-white' : 'text-stone-900'
              }`}>Question I had</h3>
            </div>
            <p className={settings.darkMode ? 'text-slate-200' : 'text-stone-700'}>
              {selectedEntry.question || 'No entry for this day'}
            </p>
          </div>

          <div className={`p-6 rounded-2xl ${
            settings.darkMode ? 'bg-slate-800' : 'bg-white'
          }`}>
            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-2 rounded-lg ${
                settings.darkMode ? 'bg-amber-900/30 text-amber-300' : 'bg-amber-100 text-amber-600'
              }`}>
                <Lightbulb size={20} />
              </div>
              <h3 className={`font-medium ${
                settings.darkMode ? 'text-white' : 'text-stone-900'
              }`}>Idea I thought about</h3>
            </div>
            <p className={settings.darkMode ? 'text-slate-200' : 'text-stone-700'}>
              {selectedEntry.idea || 'No entry for this day'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className={`text-2xl font-semibold ${
          settings.darkMode ? 'text-white' : 'text-stone-900'
        }`}>Journal History</h2>
        <p className={`text-sm ${
          settings.darkMode ? 'text-slate-300' : 'text-stone-500'
        }`}>
          Your reflection journey
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className={`p-4 rounded-xl text-center ${
          settings.darkMode ? 'bg-slate-800' : 'bg-white'
        }`}>
          <div className="text-2xl font-bold text-indigo-500">{totalEntries}</div>
          <div className={`text-sm ${
            settings.darkMode ? 'text-slate-300' : 'text-stone-500'
          }`}>Total Entries</div>
        </div>
        <div className={`p-4 rounded-xl text-center ${
          settings.darkMode ? 'bg-slate-800' : 'bg-white'
        }`}>
          <div className="text-2xl font-bold text-emerald-500">{thisMonthEntries}</div>
          <div className={`text-sm ${
            settings.darkMode ? 'text-slate-300' : 'text-stone-500'
          }`}>This Month</div>
        </div>
      </div>

      {/* Entries List */}
      {sortedEntries.length === 0 ? (
        <div className={`text-center py-12 ${
          settings.darkMode ? 'text-slate-300' : 'text-stone-500'
        }`}>
          <Calendar size={48} className="mx-auto mb-4 opacity-50" />
          <p>No entries yet</p>
          <p className="text-sm">Start your reflection journey today!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedEntries.map((entry) => (
            <button
              key={entry.date}
              onClick={() => setSelectedEntry(entry)}
              className={`w-full p-4 rounded-xl border text-left transition-all duration-200 ${
                settings.darkMode
                  ? 'bg-slate-800 border-slate-700 hover:border-slate-600 hover:bg-slate-750'
                  : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className={`font-medium ${
                      settings.darkMode ? 'text-white' : 'text-stone-900'
                    }`}>{formatDate(entry.date)}</h3>
                    <div className="flex space-x-1">
                      {entry.learned && (
                        <div className={`w-2 h-2 rounded-full ${
                          settings.darkMode ? 'bg-emerald-300' : 'bg-emerald-500'
                        }`} />
                      )}
                      {entry.question && (
                        <div className={`w-2 h-2 rounded-full ${
                          settings.darkMode ? 'bg-blue-300' : 'bg-blue-500'
                        }`} />
                      )}
                      {entry.idea && (
                        <div className={`w-2 h-2 rounded-full ${
                          settings.darkMode ? 'bg-amber-300' : 'bg-amber-500'
                        }`} />
                      )}
                    </div>
                  </div>
                  <p className={`text-sm line-clamp-2 ${
                    settings.darkMode ? 'text-slate-300' : 'text-stone-500'
                  }`}>
                    {entry.learned.substring(0, 100)}{entry.learned.length > 100 ? '...' : ''}
                  </p>
                </div>
                <ChevronRight size={20} className={
                  settings.darkMode ? 'text-slate-300' : 'text-stone-400'
                } />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}