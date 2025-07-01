import React, { useState } from 'react';
import { Calendar, ChevronRight, ChevronLeft, BookOpen, HelpCircle, Lightbulb, Trash2 } from 'lucide-react';
import { useEntries } from '../hooks/useEntries';
import { DailyEntry } from '../types';

export function History() {
  const { entries, deleteEntry } = useEntries();
  const [selectedEntry, setSelectedEntry] = useState<DailyEntry | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const sortedEntries = [...entries].sort((a, b) => b.timestamp - a.timestamp);
  const totalEntries = entries.length;
  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();
  const thisMonthEntries = entries.filter(entry => {
    const entryDate = new Date(entry.date);
    return entryDate.getMonth() === thisMonth && entryDate.getFullYear() === thisYear;
  }).length;

  const formatDate = (dateString: string, timestamp: number) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    let dateLabel = '';
    if (date.toDateString() === today.toDateString()) {
      dateLabel = 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      dateLabel = 'Yesterday';
    } else {
      dateLabel = date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric'
      });
    }

    const time = new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    return `${dateLabel} at ${time}`;
  };

  const handleDeleteEntry = (entryId: string) => {
    deleteEntry(entryId);
    setShowDeleteConfirm(null);
    if (selectedEntry && selectedEntry.id === entryId) {
      setSelectedEntry(null);
    }
  };

  if (selectedEntry) {
    return (
      <div className="py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSelectedEntry(null)}
              className="p-2 rounded-lg transition-colors text-stone-500 hover:text-stone-700 hover:bg-stone-100"
            >
              <ChevronLeft size={20} />
            </button>
            <div>
              <h2 className="text-xl font-semibold text-stone-900">
                {formatDate(selectedEntry.date, selectedEntry.timestamp)}
              </h2>
              <p className="text-sm text-stone-500">
                {new Date(selectedEntry.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setShowDeleteConfirm(selectedEntry.id)}
            className="p-2 rounded-lg transition-colors text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 size={20} />
          </button>
        </div>

        {/* Delete Confirmation */}
        {showDeleteConfirm === selectedEntry.id && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200">
            <p className="text-red-800 mb-3">Are you sure you want to delete this reflection?</p>
            <div className="flex space-x-3">
              <button
                onClick={() => handleDeleteEntry(selectedEntry.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 bg-stone-200 text-stone-700 rounded-lg hover:bg-stone-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600">
                <BookOpen size={20} />
              </div>
              <h3 className="font-medium text-stone-900">What I learned</h3>
            </div>
            <p className="text-stone-700">
              {selectedEntry.learned || 'No entry for this section'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                <HelpCircle size={20} />
              </div>
              <h3 className="font-medium text-stone-900">Question I had</h3>
            </div>
            <p className="text-stone-700">
              {selectedEntry.question || 'No entry for this section'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-lg bg-amber-100 text-amber-600">
                <Lightbulb size={20} />
              </div>
              <h3 className="font-medium text-stone-900">Idea I thought about</h3>
            </div>
            <p className="text-stone-700">
              {selectedEntry.idea || 'No entry for this section'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-stone-900">Journal History</h2>
        <p className="text-sm text-stone-500">
          Your reflection journey
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl text-center bg-white">
          <div className="text-2xl font-bold text-indigo-500">{totalEntries}</div>
          <div className="text-sm text-stone-500">Total Entries</div>
        </div>
        <div className="p-4 rounded-xl text-center bg-white">
          <div className="text-2xl font-bold text-emerald-500">{thisMonthEntries}</div>
          <div className="text-sm text-stone-500">This Month</div>
        </div>
      </div>

      {/* Entries List */}
      {sortedEntries.length === 0 ? (
        <div className="text-center py-12 text-stone-500">
          <Calendar size={48} className="mx-auto mb-4 opacity-50" />
          <p>No entries yet</p>
          <p className="text-sm">Start your reflection journey today!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedEntries.map((entry) => (
            <div key={entry.id} className="relative">
              <button
                onClick={() => setSelectedEntry(entry)}
                className="w-full p-4 rounded-xl border text-left transition-all duration-200 bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-medium text-stone-900">
                        {formatDate(entry.date, entry.timestamp)}
                      </h3>
                      <div className="flex space-x-1">
                        {entry.learned && (
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        )}
                        {entry.question && (
                          <div className="w-2 h-2 rounded-full bg-blue-500" />
                        )}
                        {entry.idea && (
                          <div className="w-2 h-2 rounded-full bg-amber-500" />
                        )}
                      </div>
                    </div>
                    <p className="text-sm line-clamp-2 text-stone-500">
                      {(entry.learned || entry.question || entry.idea).substring(0, 100)}
                      {(entry.learned || entry.question || entry.idea).length > 100 ? '...' : ''}
                    </p>
                  </div>
                  <ChevronRight size={20} className="text-stone-400" />
                </div>
              </button>
              
              {/* Quick Delete Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeleteConfirm(entry.id);
                }}
                className="absolute top-2 right-2 p-2 rounded-lg transition-colors text-stone-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={16} />
              </button>

              {/* Delete Confirmation for List Item */}
              {showDeleteConfirm === entry.id && (
                <div className="absolute top-full left-0 right-0 mt-2 p-3 rounded-lg bg-red-50 border border-red-200 z-10">
                  <p className="text-red-800 text-sm mb-2">Delete this reflection?</p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(null)}
                      className="px-3 py-1 bg-stone-200 text-stone-700 text-sm rounded hover:bg-stone-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}