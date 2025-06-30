import React, { useState } from 'react';
import { Download, FileText, Code, File, Check } from 'lucide-react';
import { useEntries } from '../hooks/useEntries';
import { useSettings } from '../hooks/useSettings';
import { exportToJSON, exportToMarkdown, exportToText, downloadFile } from '../utils/export';

export function Export() {
  const { entries } = useEntries();
  const { settings } = useSettings();
  const [exportedFormat, setExportedFormat] = useState<string | null>(null);

  const handleExport = (format: 'json' | 'markdown' | 'text') => {
    if (entries.length === 0) return;

    const timestamp = new Date().toISOString().split('T')[0];
    let content: string;
    let filename: string;
    let mimeType: string;

    switch (format) {
      case 'json':
        content = exportToJSON(entries);
        filename = `micromind-journal-${timestamp}.json`;
        mimeType = 'application/json';
        break;
      case 'markdown':
        content = exportToMarkdown(entries);
        filename = `micromind-journal-${timestamp}.md`;
        mimeType = 'text/markdown';
        break;
      case 'text':
        content = exportToText(entries);
        filename = `micromind-journal-${timestamp}.txt`;
        mimeType = 'text/plain';
        break;
      default:
        return;
    }

    downloadFile(content, filename, mimeType);
    setExportedFormat(format);
    
    // Reset the indicator after 2 seconds
    setTimeout(() => setExportedFormat(null), 2000);
  };

  const exportOptions = [
    {
      format: 'markdown' as const,
      icon: FileText,
      title: 'Markdown',
      description: 'Formatted text perfect for notes apps',
      color: 'blue'
    },
    {
      format: 'json' as const,
      icon: Code,
      title: 'JSON',
      description: 'Structured data for backup or import',
      color: 'purple'
    },
    {
      format: 'text' as const,
      icon: File,
      title: 'Plain Text',
      description: 'Simple text format for any app',
      color: 'gray'
    }
  ];

  return (
    <div className="py-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className={`text-2xl font-semibold ${
          settings.darkMode ? 'text-white' : 'text-stone-900'
        }`}>Export Journal</h2>
        <p className={`text-sm ${
          settings.darkMode ? 'text-slate-300' : 'text-stone-500'
        }`}>
          Download your reflections in your preferred format
        </p>
      </div>

      {/* Stats */}
      <div className={`p-6 rounded-xl text-center ${
        settings.darkMode ? 'bg-slate-800' : 'bg-white'
      }`}>
        <div className="text-3xl font-bold text-indigo-500 mb-2">{entries.length}</div>
        <div className={`text-sm ${
          settings.darkMode ? 'text-slate-300' : 'text-stone-500'
        }`}>
          {entries.length === 1 ? 'Entry' : 'Entries'} ready to export
        </div>
        {entries.length > 0 && (
          <div className={`text-xs mt-2 ${
            settings.darkMode ? 'text-slate-400' : 'text-stone-400'
          }`}>
            From {new Date(Math.min(...entries.map(e => new Date(e.date).getTime()))).toLocaleDateString()} 
            {' '} to {new Date(Math.max(...entries.map(e => new Date(e.date).getTime()))).toLocaleDateString()}
          </div>
        )}
      </div>

      {/* Export Options */}
      {entries.length === 0 ? (
        <div className={`text-center py-12 ${
          settings.darkMode ? 'text-slate-300' : 'text-stone-500'
        }`}>
          <Download size={48} className="mx-auto mb-4 opacity-50" />
          <p>No entries to export</p>
          <p className="text-sm">Start writing to create your first export</p>
        </div>
      ) : (
        <div className="space-y-4">
          {exportOptions.map(({ format, icon: Icon, title, description, color }) => (
            <button
              key={format}
              onClick={() => handleExport(format)}
              disabled={exportedFormat === format}
              className={`w-full p-6 rounded-xl border text-left transition-all duration-200 ${
                settings.darkMode
                  ? 'bg-slate-800 border-slate-700 hover:border-slate-600 hover:bg-slate-750'
                  : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50'
              } ${exportedFormat === format ? 'opacity-75' : ''}`}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${
                  color === 'blue' 
                    ? settings.darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-600'
                    : color === 'purple'
                    ? settings.darkMode ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-100 text-purple-600'
                    : settings.darkMode ? 'bg-slate-700 text-slate-300' : 'bg-stone-100 text-stone-600'
                }`}>
                  {exportedFormat === format ? (
                    <Check size={24} />
                  ) : (
                    <Icon size={24} />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold text-lg mb-1 ${
                    settings.darkMode ? 'text-white' : 'text-stone-900'
                  }`}>
                    {exportedFormat === format ? 'Downloaded!' : `Export as ${title}`}
                  </h3>
                  <p className={`text-sm ${
                    settings.darkMode ? 'text-slate-300' : 'text-stone-500'
                  }`}>
                    {exportedFormat === format ? 'File saved to your downloads' : description}
                  </p>
                </div>
                <Download size={20} className={`${
                  settings.darkMode ? 'text-slate-300' : 'text-stone-400'
                } ${exportedFormat === format ? 'opacity-0' : ''}`} />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Privacy Note */}
      <div className={`p-4 rounded-xl ${
        settings.darkMode 
          ? 'bg-slate-800 border border-slate-700' 
          : 'bg-stone-100 border border-stone-200'
      }`}>
        <p className={`text-sm ${
          settings.darkMode ? 'text-slate-300' : 'text-stone-600'
        }`}>
          <strong>Privacy:</strong> All exports are generated locally on your device. 
          Your data never leaves your browser.
        </p>
      </div>
    </div>
  );
}