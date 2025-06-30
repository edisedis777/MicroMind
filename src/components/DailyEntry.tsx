import React, { useState, useEffect } from 'react';
import { Check, Lightbulb, HelpCircle, BookOpen } from 'lucide-react';
import { useEntries } from '../hooks/useEntries';
import { useSettings } from '../hooks/useSettings';
import { DailyEntry as DailyEntryType } from '../types';

export function DailyEntry() {
  const { todaysEntry, saveEntry } = useEntries();
  const { settings } = useSettings();
  const [formData, setFormData] = useState<DailyEntryType | null>(null);
  const [saveTimeout, setSaveTimeout] = useState<NodeJS.Timeout | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    if (todaysEntry) {
      setFormData(todaysEntry);
    }
  }, [todaysEntry]);

  const handleInputChange = (field: keyof DailyEntryType, value: string) => {
    if (!formData) return;

    const updated = { ...formData, [field]: value };
    setFormData(updated);

    // Clear existing timeout
    if (saveTimeout) {
      clearTimeout(saveTimeout);
    }

    // Set new timeout for auto-save
    const timeout = setTimeout(() => {
      saveEntry(updated);
      setLastSaved(new Date());
    }, 1000);

    setSaveTimeout(timeout);
  };

  const isComplete = formData && formData.learned.trim() && formData.question.trim() && formData.idea.trim();

  const prompts = [
    {
      field: 'learned' as const,
      icon: BookOpen,
      title: 'What did I learn today?',
      placeholder: 'Something new I discovered or understood...',
      color: 'emerald'
    },
    {
      field: 'question' as const,
      icon: HelpCircle,
      title: "What's one question I have?",
      placeholder: 'Something I wonder about or want to explore...',
      color: 'blue'
    },
    {
      field: 'idea' as const,
      icon: Lightbulb,
      title: 'What idea came to mind?',
      placeholder: 'A thought, insight, or creative spark...',
      color: 'amber'
    }
  ];

  if (!formData) {
    return (
      <div className="py-8 text-center">
        <div className={`animate-pulse ${
          settings.darkMode ? 'text-white' : 'text-stone-900'
        }`}>Loading...</div>
      </div>
    );
  }

  return (
    <div className="py-6 space-y-6">
      {/* Welcome Message */}
      <div className="text-center space-y-2">
        <h2 className={`text-2xl font-semibold ${
          settings.darkMode ? 'text-white' : 'text-stone-900'
        }`}>
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long',
            month: 'long', 
            day: 'numeric' 
          })}
        </h2>
        <p className={`text-sm ${
          settings.darkMode ? 'text-slate-300' : 'text-stone-500'
        }`}>
          Take a moment to reflect on your day
        </p>
      </div>

      {/* Entry Complete Indicator */}
      {isComplete && (
        <div className={`flex items-center justify-center space-x-2 p-4 rounded-xl ${
          settings.darkMode 
            ? 'bg-emerald-900/30 text-emerald-300' 
            : 'bg-emerald-50 text-emerald-600'
        } transition-all duration-300`}>
          <Check size={20} />
          <span className="font-medium">Today's reflection complete!</span>
        </div>
      )}

      {/* Prompts */}
      <div className="space-y-6">
        {prompts.map(({ field, icon: Icon, title, placeholder, color }) => (
          <div
            key={field}
            className={`p-6 rounded-2xl border transition-all duration-300 ${
              settings.darkMode
                ? 'bg-slate-800 border-slate-700 hover:border-slate-600'
                : 'bg-white border-stone-200 hover:border-stone-300'
            } ${formData[field].trim() ? 'ring-2 ring-opacity-20' : ''} ${
              formData[field].trim() && color === 'emerald' ? 'ring-emerald-500' : ''
            } ${
              formData[field].trim() && color === 'blue' ? 'ring-blue-500' : ''
            } ${
              formData[field].trim() && color === 'amber' ? 'ring-amber-500' : ''
            }`}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-2 rounded-lg ${
                color === 'emerald' 
                  ? settings.darkMode ? 'bg-emerald-900/30 text-emerald-300' : 'bg-emerald-100 text-emerald-600'
                  : color === 'blue'
                  ? settings.darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-600'
                  : settings.darkMode ? 'bg-amber-900/30 text-amber-300' : 'bg-amber-100 text-amber-600'
              }`}>
                <Icon size={20} />
              </div>
              <h3 className={`font-medium text-lg ${
                settings.darkMode ? 'text-white' : 'text-stone-900'
              }`}>{title}</h3>
            </div>
            
            <textarea
              value={formData[field]}
              onChange={(e) => handleInputChange(field, e.target.value)}
              placeholder={placeholder}
              className={`w-full p-4 rounded-xl border resize-none transition-all duration-200 ${
                settings.darkMode
                  ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20'
                  : 'bg-stone-50 border-stone-200 text-stone-900 placeholder-stone-400 focus:border-stone-300 focus:ring-2 focus:ring-stone-300/20'
              } focus:outline-none`}
              rows={3}
            />
          </div>
        ))}
      </div>

      {/* Auto-save Indicator */}
      {lastSaved && (
        <div className={`text-center text-xs ${
          settings.darkMode ? 'text-slate-300' : 'text-stone-400'
        }`}>
          Last saved {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      )}
    </div>
  );
}