'use client';

import React, { useState } from 'react';
import { X, FileEdit, Check } from 'lucide-react';
import { ReviewerNotesData } from '@/features/hospital-admin/emergencyAuditDetailTypes';

interface EditReviewerNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentNotes: ReviewerNotesData;
  onSaveNotes: (newNotes: string) => void;
}

export const EditReviewerNotesModal: React.FC<EditReviewerNotesModalProps> = ({
  isOpen,
  onClose,
  currentNotes,
  onSaveNotes,
}) => {
  const [notes, setNotes] = useState(currentNotes.notes);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveNotes(notes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#0066FF] flex items-center justify-center shrink-0">
              <FileEdit className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                Update Compliance Reviewer Notes
              </h3>
              <p className="text-[11px] text-slate-500">
                Authorized Hospital Administrator Sign-off
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSave} className="p-5 space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 text-[11px] uppercase tracking-wider block mb-1.5">
              Reviewer Notes Content
            </label>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div className="text-[11px] text-slate-500">
            Signer: <span className="font-semibold text-slate-700">{currentNotes.author}</span> •{' '}
            <span>{currentNotes.role}</span>
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg border border-slate-300 text-slate-700 bg-white hover:bg-slate-100 font-medium text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#0066FF] hover:bg-blue-700 text-white font-semibold text-xs transition-colors cursor-pointer shadow-xs"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save Notes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
