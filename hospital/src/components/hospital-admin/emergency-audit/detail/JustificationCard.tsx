'use client';

import React from 'react';
import { MessageSquareQuote } from 'lucide-react';
import { JustificationData } from '@/features/hospital-admin/emergencyAuditDetailTypes';

interface JustificationCardProps {
  justification: JustificationData;
}

export const JustificationCard: React.FC<JustificationCardProps> = ({
  justification,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-3.5 pb-2 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
            <MessageSquareQuote className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 tracking-tight">
            Justification Provided
          </h3>
        </div>

        {/* Quote Content */}
        <p className="text-xs text-slate-600 leading-relaxed italic">
          &ldquo;{justification.quote}&rdquo;
        </p>
      </div>

      {/* Signature & Date */}
      <div className="mt-4 pt-2 border-t border-slate-50 flex items-center justify-between text-[11px] text-slate-500">
        <span className="font-semibold text-slate-700">
          — {justification.author}
        </span>
        <span className="text-slate-400 font-mono">
          {justification.timestamp}
        </span>
      </div>
    </div>
  );
};
