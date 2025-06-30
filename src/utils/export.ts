import { DailyEntry } from '../types';

export function exportToJSON(entries: DailyEntry[]): string {
  return JSON.stringify(entries, null, 2);
}

export function exportToMarkdown(entries: DailyEntry[]): string {
  const sortedEntries = [...entries].sort((a, b) => a.date.localeCompare(b.date));
  
  let markdown = '# MicroMind Journal\n\n';
  markdown += `Generated on ${new Date().toLocaleDateString()}\n\n`;
  
  sortedEntries.forEach(entry => {
    const date = new Date(entry.date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    markdown += `## ${date}\n\n`;
    markdown += `**What I learned:** ${entry.learned}\n\n`;
    markdown += `**Question I have:** ${entry.question}\n\n`;
    markdown += `**Idea I thought about:** ${entry.idea}\n\n`;
    markdown += '---\n\n';
  });
  
  return markdown;
}

export function exportToText(entries: DailyEntry[]): string {
  const sortedEntries = [...entries].sort((a, b) => a.date.localeCompare(b.date));
  
  let text = 'MicroMind Journal\n';
  text += '================\n\n';
  text += `Generated on ${new Date().toLocaleDateString()}\n\n`;
  
  sortedEntries.forEach(entry => {
    const date = new Date(entry.date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    text += `${date}\n`;
    text += '-'.repeat(date.length) + '\n\n';
    text += `What I learned: ${entry.learned}\n\n`;
    text += `Question I have: ${entry.question}\n\n`;
    text += `Idea I thought about: ${entry.idea}\n\n`;
    text += '\n';
  });
  
  return text;
}

export function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}