import React from 'react';
import { Shield, Info, Heart, Clock, Target, Zap } from 'lucide-react';
import { useEntries } from '../hooks/useEntries';

export function Settings() {
  const { entries } = useEntries();

  const totalWords = entries.reduce((total, entry) => {
    return total + (entry.learned + entry.question + entry.idea).split(' ').length;
  }, 0);

  return (
    <div className="py-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-stone-900">Settings</h2>
        <p className="text-sm text-stone-500">
          Customize your MicroMind experience
        </p>
      </div>

      {/* Stats */}
      <div className="p-6 rounded-xl bg-white">
        <h3 className="font-semibold text-lg mb-4 text-stone-900">Your Journey</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-500">{entries.length}</div>
            <div className="text-sm text-stone-500">
              {entries.length === 1 ? 'Day' : 'Days'} Reflected
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-500">{totalWords}</div>
            <div className="text-sm text-stone-500">
              Words Written
            </div>
          </div>
        </div>
      </div>

      {/* Privacy */}
      <div className="p-6 rounded-xl bg-white">
        <div className="flex items-center space-x-3 mb-3">
          <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600">
            <Shield size={20} />
          </div>
          <h3 className="font-semibold text-lg text-stone-900">Privacy & Data</h3>
        </div>
        
        <div className="text-sm space-y-2 text-stone-600">
          <p>• All your data stays on your device</p>
          <p>• No accounts or sign-ups required</p>
          <p>• Works completely offline</p>
          <p>• Export your data anytime</p>
        </div>
      </div>

      {/* About */}
      <div className="p-6 rounded-xl bg-white">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
            <Info size={20} />
          </div>
          <h3 className="font-semibold text-lg text-stone-900">About MicroMind</h3>
        </div>
        
        <div className="text-sm space-y-4 text-stone-600">
          <p>
            MicroMind is designed to help you build a powerful daily reflection habit through 
            three simple but transformative questions. Research shows that regular reflection 
            enhances learning retention, promotes self-awareness, and accelerates personal growth.
          </p>

          <div className="space-y-3">
            <h4 className="font-semibold text-stone-800">How It Works:</h4>
            
            <div className="flex items-start space-x-3">
              <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-600 mt-0.5">
                <Target size={14} />
              </div>
              <div>
                <p className="font-medium text-stone-800">Daily Prompts</p>
                <p className="text-xs">Answer three focused questions each day to capture learning, curiosity, and insights</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-1.5 rounded-lg bg-blue-100 text-blue-600 mt-0.5">
                <Zap size={14} />
              </div>
              <div>
                <p className="font-medium text-stone-800">Auto-Save</p>
                <p className="text-xs">Your thoughts are automatically saved as you type - never lose an insight again</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-1.5 rounded-lg bg-amber-100 text-amber-600 mt-0.5">
                <Clock size={14} />
              </div>
              <div>
                <p className="font-medium text-stone-800">Track Progress</p>
                <p className="text-xs">View your reflection history, maintain streaks, and see your growth over time</p>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-stone-100">
            <h4 className="font-semibold text-stone-800 mb-2">The Three Questions:</h4>
            <div className="space-y-1 text-xs">
              <p><span className="font-medium">📚 What did I learn?</span> - Reinforces knowledge and identifies growth</p>
              <p><span className="font-medium">❓ What question do I have?</span> - Cultivates curiosity and critical thinking</p>
              <p><span className="font-medium">💡 What idea came to mind?</span> - Captures creativity and insights</p>
            </div>
          </div>

          <div className="pt-2 border-t border-stone-100">
            <p className="text-xs">
              <strong>Why it works:</strong> Just 5 minutes of daily reflection can significantly improve 
              learning retention, self-awareness, and decision-making. Small, consistent habits create 
              lasting transformation.
            </p>
          </div>
          
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