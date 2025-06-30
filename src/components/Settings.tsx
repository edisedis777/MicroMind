import React from 'react';
import { Moon, Sun, Shield, Info, Heart } from 'lucide-react';
import { useSettings } from '../hooks/useSettings';
import { useEntries } from '../hooks/useEntries';

export function Settings() {
  const { settings, toggleDarkMode } = useSettings();
  const { entries } = useEntries();

  const totalWords = entries.reduce((total, entry) => {
    return total + (entry.learned + entry.question + entry.idea).split(' ').length;
  }, 0);

  return (
    <div className="py-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className={`text-2xl font-semibold ${
          settings.darkMode ? 'text-white' : 'text-stone-900'
        }`}>Settings</h2>
        <p className={`text-sm ${
          settings.darkMode ? 'text-slate-300' : 'text-stone-500'
        }`}>
          Customize your MicroMind experience
        </p>
      </div>

      {/* Appearance */}
      <div className={`p-6 rounded-xl ${
        settings.darkMode ? 'bg-slate-800' : 'bg-white'
      }`}>
        <h3 className={`font-semibold text-lg mb-4 ${
          settings.darkMode ? 'text-white' : 'text-stone-900'
        }`}>Appearance</h3>
        
        <button
          onClick={toggleDarkMode}
          className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
            settings.darkMode
              ? 'border-slate-600 hover:border-slate-500 bg-slate-700'
              : 'border-stone-200 hover:border-stone-300 bg-stone-50'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${
              settings.darkMode ? 'bg-slate-600' : 'bg-stone-200'
            }`}>
              {settings.darkMode ? (
                <Moon size={20} className="text-slate-200" />
              ) : (
                <Sun size={20} className="text-stone-600" />
              )}
            </div>
            <div className="text-left">
              <div className={`font-medium ${
                settings.darkMode ? 'text-white' : 'text-stone-900'
              }`}>
                {settings.darkMode ? 'Dark Mode' : 'Light Mode'}
              </div>
              <div className={`text-sm ${
                settings.darkMode ? 'text-slate-300' : 'text-stone-500'
              }`}>
                {settings.darkMode ? 'Easier on the eyes' : 'Clean and bright'}
              </div>
            </div>
          </div>
          
          <div className={`w-12 h-6 rounded-full border-2 transition-all duration-300 ${
            settings.darkMode
              ? 'bg-indigo-600 border-indigo-600'
              : 'bg-stone-200 border-stone-300'
          }`}>
            <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-300 ${
              settings.darkMode ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </div>
        </button>
      </div>

      {/* Stats */}
      <div className={`p-6 rounded-xl ${
        settings.darkMode ? 'bg-slate-800' : 'bg-white'
      }`}>
        <h3 className={`font-semibold text-lg mb-4 ${
          settings.darkMode ? 'text-white' : 'text-stone-900'
        }`}>Your Journey</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-500">{entries.length}</div>
            <div className={`text-sm ${
              settings.darkMode ? 'text-slate-300' : 'text-stone-500'
            }`}>
              {entries.length === 1 ? 'Day' : 'Days'} Reflected
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-500">{totalWords}</div>
            <div className={`text-sm ${
              settings.darkMode ? 'text-slate-300' : 'text-stone-500'
            }`}>
              Words Written
            </div>
          </div>
        </div>
      </div>

      {/* Privacy */}
      <div className={`p-6 rounded-xl ${
        settings.darkMode ? 'bg-slate-800' : 'bg-white'
      }`}>
        <div className="flex items-center space-x-3 mb-3">
          <div className={`p-2 rounded-lg ${
            settings.darkMode ? 'bg-emerald-900/30 text-emerald-300' : 'bg-emerald-100 text-emerald-600'
          }`}>
            <Shield size={20} />
          </div>
          <h3 className={`font-semibold text-lg ${
            settings.darkMode ? 'text-white' : 'text-stone-900'
          }`}>Privacy & Data</h3>
        </div>
        
        <div className={`text-sm space-y-2 ${
          settings.darkMode ? 'text-slate-300' : 'text-stone-600'
        }`}>
          <p>• All your data stays on your device</p>
          <p>• No accounts or sign-ups required</p>
          <p>• Works completely offline</p>
          <p>• Export your data anytime</p>
        </div>
      </div>

      {/* About */}
      <div className={`p-6 rounded-xl ${
        settings.darkMode ? 'bg-slate-800' : 'bg-white'
      }`}>
        <div className="flex items-center space-x-3 mb-3">
          <div className={`p-2 rounded-lg ${
            settings.darkMode ? 'bg-indigo-900/30 text-indigo-300' : 'bg-indigo-100 text-indigo-600'
          }`}>
            <Info size={20} />
          </div>
          <h3 className={`font-semibold text-lg ${
            settings.darkMode ? 'text-white' : 'text-stone-900'
          }`}>About MicroMind</h3>
        </div>
        
        <div className={`text-sm space-y-3 ${
          settings.darkMode ? 'text-slate-300' : 'text-stone-600'
        }`}>
          <p>
            MicroMind helps you develop a daily habit of reflection by logging 
            what you learn, questions you have, and ideas that spark your curiosity.
          </p>
          
          <div className="flex items-center space-x-2 pt-2">
            <span>Made with</span>
            <Heart size={16} className="text-red-500" />
            <span>for mindful growth</span>
          </div>
        </div>
      </div>
    </div>
  );
}