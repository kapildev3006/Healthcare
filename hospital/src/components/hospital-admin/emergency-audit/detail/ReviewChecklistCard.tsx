'use client';

import React from 'react';
import { ListChecks, CheckCircle2, MinusCircle } from 'lucide-react';
import { ReviewChecklistItem } from '@/features/hospital-admin/emergencyAuditDetailTypes';

interface ReviewChecklistCardProps {
  checklist: ReviewChecklistItem[];
  onToggleItem?: (id: string) => void;
}

export const ReviewChecklistCard: React.FC<ReviewChecklistCardProps> = ({
  checklist,
  onToggleItem,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-4 pb-2 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
            <ListChecks className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 tracking-tight">
            Review Checklist
          </h3>
        </div>

        {/* Checklist Items */}
        <div className="space-y-3 pt-1">
          {checklist.map((item) => (
            <div
              key={item.id}
              onClick={() => onToggleItem?.(item.id)}
              className="flex items-center gap-2.5 text-xs text-slate-700 py-0.5 cursor-pointer select-none group"
            >
              {item.completed ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 group-hover:scale-110 transition-transform" />
              ) : (
                <MinusCircle className="w-4 h-4 text-slate-300 shrink-0 group-hover:text-slate-400 transition-colors" />
              )}
              <span
                className={`text-[12px] ${
                  item.completed
                    ? 'font-medium text-slate-800'
                    : 'text-slate-500'
                }`}
              >
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
