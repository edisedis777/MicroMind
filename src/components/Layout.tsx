import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain, Calendar, Download, Settings, Flame } from 'lucide-react';
import { useSettings } from '../hooks/useSettings';
import { useEntries } from '../hooks/useEntries';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { settings } = useSettings();
  const { getStreak } = useEntries();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Brain, label: 'Today' },
    { path: '/history', icon: Calendar, label: 'History' },
    { path: '/export', icon: Download, label: 'Export' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      settings.darkMode 
        ? 'bg-slate-900 text-white' 
        : 'bg-stone-50 text-stone-900'
    }`}>
      {/* Header */}
      <header className={`sticky top-0 z-10 ${
        settings.darkMode 
          ? 'bg-slate-800/90 border-slate-700' 
          : 'bg-white/90 border-stone-200'
      } backdrop-blur-sm border-b transition-colors duration-300`}>
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-xl ${
              settings.darkMode ? 'bg-indigo-600' : 'bg-indigo-500'
            }`}>
              <Brain size={24} className="text-white" />
            </div>
            <div>
              <h1 className={`text-lg font-semibold ${
                settings.darkMode ? 'text-white' : 'text-stone-900'
              }`}>MicroMind</h1>
              <p className={`text-xs ${
                settings.darkMode ? 'text-slate-300' : 'text-stone-500'
              }`}>Daily Reflection</p>
            </div>
          </div>
          
          {getStreak > 0 && (
            <div className={`flex items-center space-x-1 px-3 py-1 rounded-full ${
              settings.darkMode 
                ? 'bg-orange-900/30 text-orange-300' 
                : 'bg-orange-100 text-orange-600'
            }`}>
              <Flame size={14} />
              <span className="text-sm font-medium">{getStreak}</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 pb-24">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className={`fixed bottom-0 left-0 right-0 ${
        settings.darkMode 
          ? 'bg-slate-800/90 border-slate-700' 
          : 'bg-white/90 border-stone-200'
      } backdrop-blur-sm border-t transition-colors duration-300`}>
        <div className="max-w-md mx-auto px-4 py-2">
          <div className="flex justify-around">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-colors duration-200 ${
                  location.pathname === path
                    ? settings.darkMode
                      ? 'text-indigo-300 bg-indigo-900/30'
                      : 'text-indigo-600 bg-indigo-50'
                    : settings.darkMode
                      ? 'text-slate-300 hover:text-white'
                      : 'text-stone-500 hover:text-stone-700'
                }`}
              >
                <Icon size={20} />
                <span className="text-xs font-medium">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}