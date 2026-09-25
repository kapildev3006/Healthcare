'use client';

import React from 'react';
import { FileEdit } from 'lucide-react';
import { ReviewerNotesData } from '@/features/hospital-admin/emergencyAuditDetailTypes';

interface ReviewerNotesCardProps {
  reviewerNotes: ReviewerNotesData;
  onEditNotes?: () => void;
}

export const ReviewerNotesCard: React.FC<ReviewerNotesCardProps> = ({
  reviewerNotes,
  onEditNotes,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
              <FileEdit className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 tracking-tight">
              Reviewer Notes
            </h3>
          </div>

          {onEditNotes && (
            <button
              type="button"
              onClick={onEditNotes}
              className="text-[11px] font-semibold text-[#0066FF] hover:underline cursor-pointer"
            >
              Edit
            </button>
          )}
        </div>

        {/* Notes Content */}
        <p className="text-xs text-slate-600 leading-relaxed">
          {reviewerNotes.notes}
        </p>
      </div>

      {/* Signature & Date */}
      <div className="mt-4 pt-2 border-t border-slate-50 flex items-center justify-between text-[11px] text-slate-500">
        <div>
          <span className="font-semibold text-slate-700 block">
            — {reviewerNotes.author}
          </span>
          <span className="text-[10.5px] text-slate-400">
            {reviewerNotes.role}
          </span>
        </div>
        <span className="text-slate-400 font-mono">
          {reviewerNotes.timestamp}
        </span>
      </div>
    </div>
  );
};
