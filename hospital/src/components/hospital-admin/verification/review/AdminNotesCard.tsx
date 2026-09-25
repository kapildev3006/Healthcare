'use client';

import React, { useState } from 'react';
import { MessageSquare, ChevronDown, Plus } from 'lucide-react';

interface NoteItem {
  id: string;
  author: string;
  role: string;
  type: string;
  text: string;
  timestamp: string;
}

export const AdminNotesCard: React.FC = () => {
  const [noteType, setNoteType] = useState('Internal Note');
  const [noteText, setNoteText] = useState('');
  const [notes, setNotes] = useState<NoteItem[]>([
    {
      id: 'note-1',
      author: 'Rajesh Kumar',
      role: 'Hospital Administrator',
      type: 'Internal Note',
      text: 'Medical council license verified with MCI portal. Awaiting final experience certificate sign-off from HR.',
      timestamp: 'Jun 11, 2025, 11:30 AM',
    },
  ]);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    const newNote: NoteItem = {
      id: `note-${Date.now()}`,
      author: 'Rajesh Kumar',
      role: 'Hospital Administrator',
      type: noteType,
      text: noteText.trim(),
      timestamp: 'Just now',
    };

    setNotes((prev) => [newNote, ...prev]);
    setNoteText('');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
            <MessageSquare className="w-4 h-4" strokeWidth={2.4} />
          </div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Admin Notes & Comments
          </h3>
        </div>

        {/* Note Type Dropdown + Add Note Button */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className="relative">
            <select
              value={noteType}
              onChange={(e) => setNoteType(e.target.value)}
              className="h-8 pl-2.5 pr-7 rounded-lg border border-slate-200 text-xs text-slate-700 bg-white appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="Internal Note">Internal Note</option>
              <option value="Compliance Note">Compliance Note</option>
              <option value="HR Remark">HR Remark</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button
            type="button"
            onClick={handleAddNote}
            className="h-8 px-3.5 rounded-lg bg-[#0066FF] hover:bg-blue-600 text-white text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer shadow-2xs active:scale-98"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Note</span>
          </button>
        </div>
      </div>

      {/* Note Textarea */}
      <textarea
        rows={2}
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        placeholder="Add your notes, comments or internal remarks about this application..."
        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200/90 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none transition-all"
      />

      {/* Existing Notes Feed */}
      {notes.length > 0 && (
        <div className="mt-4 pt-3.5 border-t border-slate-100 space-y-3">
          {notes.map((note) => (
            <div
              key={note.id}
              className="p-3 rounded-xl bg-slate-50 border border-slate-100/80 text-xs"
            >
              <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900">
                    {note.author}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    • {note.role}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-[#0066FF] border border-blue-200">
                    {note.type}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {note.timestamp}
                  </span>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed mt-1">
                {note.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
