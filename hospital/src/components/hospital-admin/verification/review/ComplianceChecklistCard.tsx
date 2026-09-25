'use client';

import React from 'react';
import { FileText, CheckCircle2, Clock } from 'lucide-react';

interface ChecklistItem {
  id: string;
  label: string;
  status: 'Verified' | 'Pending';
}

const defaultChecklist: ChecklistItem[] = [
  { id: 'c-1', label: 'Identity Verification', status: 'Verified' },
  { id: 'c-2', label: 'Medical Qualification', status: 'Verified' },
  { id: 'c-3', label: 'Council Registration', status: 'Verified' },
  { id: 'c-4', label: 'Experience Verification', status: 'Verified' },
  { id: 'c-5', label: 'Employment History', status: 'Pending' },
  { id: 'c-6', label: 'Document Authenticity', status: 'Verified' },
];

export const ComplianceChecklistCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
      {/* Header */}
      <div className="flex items-center gap-2 pb-3.5 mb-4 border-b border-slate-100">
        <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
          <FileText className="w-4 h-4" strokeWidth={2.4} />
        </div>
        <h3 className="text-sm font-bold text-slate-900 tracking-tight">
          Compliance Checklist
        </h3>
      </div>

      {/* Items List */}
      <div className="space-y-3">
        {defaultChecklist.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between text-xs py-0.5"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {item.status === 'Verified' ? (
                <CheckCircle2
                  className="w-4 h-4 text-[#16A34A] shrink-0"
                  strokeWidth={2.2}
                />
              ) : (
                <div className="w-4 h-4 rounded-full bg-amber-100 text-[#D97706] flex items-center justify-center shrink-0 text-[10px] font-bold">
                  +
                </div>
              )}
              <span className="text-slate-700 font-medium truncate">
                {item.label}
              </span>
            </div>

            {item.status === 'Verified' ? (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]">
                Verified
              </span>
            ) : (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]">
                Pending
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
