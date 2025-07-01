import React, { useState, useEffect } from 'react';
import { Check, Lightbulb, HelpCircle, BookOpen, Plus, Save } from 'lucide-react';
import { useEntries } from '../hooks/useEntries';
import { DailyEntry as DailyEntryType } from '../types';

export function DailyEntry() {
  const { currentEntry, setCurrentEntry, saveEntry, createNewEntry } = useEntries();
  const [formData, setFormData] = useState<DailyEntryType | null>(null);
  const [saveTimeout, setSaveTimeout] = useState<NodeJS.Timeout | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  useEffect(() => {
    if (currentEntry) {
      setFormData(currentEntry);
    }
  }, [currentEntry]);

  const handleInputChange = (field: keyof DailyEntryType, value: string) => {
    if (!formData) return;

    const updated = { ...formData, [field]: value };
    setFormData(updated);
    setCurrentEntry(updated);

    // Clear existing timeout
    if (saveTimeout) {
      clearTimeout(saveTimeout);
    }

    // Auto-save after 2 seconds of inactivity
    const timeout = setTimeout(() => {
      if (updated.learned.trim() || updated.question.trim() || updated.idea.trim()) {
        saveEntry(updated);
        setLastSaved(new Date());
      }
    }, 2000);

    setSaveTimeout(timeout);
  };

  const handleSaveEntry = () => {
    if (!formData) return;
    
    const hasContent = formData.learned.trim() || formData.question.trim() || formData.idea.trim();
    if (!hasContent) return;

    saveEntry(formData);
    setLastSaved(new Date());
    setShowSaveSuccess(true);
    
    // Hide success message after 2 seconds
    setTimeout(() => setShowSaveSuccess(false), 2000);
  };

  const handleNewReflection = () => {
    const newEntry = createNewEntry();
    setFormData(newEntry);
    setLastSaved(null);
  };

  const isComplete = formData && formData.learned.trim() && formData.question.trim() && formData.idea.trim();
  
  // Check if there's any content in any of the fields
  const hasAnyContent = formData && (
    (formData.learned && formData.learned.trim().length > 0) || 
    (formData.question && formData.question.trim().length > 0) || 
    (formData.idea && formData.idea.trim().length > 0)
  );

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
        <div className="animate-pulse text-stone-900">Loading...</div>
      </div>
    );
  }

  return (
    <div className="py-6 space-y-6">
      {/* Welcome Message */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-stone-900">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long',
            month: 'long', 
            day: 'numeric' 
          })}
        </h2>
        <p className="text-sm text-stone-500">
          Take a moment to reflect on your day
        </p>
      </div>

      {/* Entry Complete Indicator */}
      {isComplete && (
        <div className="flex items-center justify-center space-x-2 p-4 rounded-xl bg-emerald-50 text-emerald-600 transition-all duration-300">
          <Check size={20} />
          <span className="font-medium">Reflection complete!</span>
        </div>
      )}

      {/* Save Success Message */}
      {showSaveSuccess && (
        <div className="flex items-center justify-center space-x-2 p-4 rounded-xl bg-blue-50 text-blue-600 transition-all duration-300">
          <Check size={20} />
          <span className="font-medium">Reflection saved successfully!</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 justify-center">
        {hasAnyContent && (
          <button
            onClick={handleSaveEntry}
            className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 transition-colors duration-200 font-medium shadow-lg hover:shadow-xl"
          >
            <Save size={18} />
            <span>Save Reflection</span>
          </button>
        )}
        
        <button
          onClick={handleNewReflection}
          className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition-colors duration-200 font-medium shadow-lg hover:shadow-xl"
        >
          <Plus size={18} />
          <span>New Reflection</span>
        </button>
      </div>

      {/* Prompts */}
      <div className="space-y-6">
        {prompts.map(({ field, icon: Icon, title, placeholder, color }) => (
          <div
            key={field}
            className={`p-6 rounded-2xl border transition-all duration-300 bg-white border-stone-200 hover:border-stone-300 ${
              formData[field] && formData[field].trim() ? 'ring-2 ring-opacity-20' : ''
            } ${
              formData[field] && formData[field].trim() && color === 'emerald' ? 'ring-emerald-500' : ''
            } ${
              formData[field] && formData[field].trim() && color === 'blue' ? 'ring-blue-500' : ''
            } ${
              formData[field] && formData[field].trim() && color === 'amber' ? 'ring-amber-500' : ''
            }`}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-2 rounded-lg ${
                color === 'emerald' 
                  ? 'bg-emerald-100 text-emerald-600'
                  : color === 'blue'
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-amber-100 text-amber-600'
              }`}>
                <Icon size={20} />
              </div>
              <h3 className="font-medium text-lg text-stone-900">{title}</h3>
            </div>
            
            <textarea
              value={formData[field] || ''}
              onChange={(e) => handleInputChange(field, e.target.value)}
              placeholder={placeholder}
              className="w-full p-4 rounded-xl border resize-none transition-all duration-200 bg-stone-50 border-stone-200 text-stone-900 placeholder-stone-400 focus:border-stone-300 focus:ring-2 focus:ring-stone-300/20 focus:outline-none"
              rows={3}
            />
          </div>
        ))}
      </div>

      {/* Auto-save Indicator */}
      {lastSaved && (
        <div className="text-center text-xs text-stone-400">
          Last auto-saved {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      )}
    </div>
  );
}