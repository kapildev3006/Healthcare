'use client';

import React from 'react';
import { ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { ComplianceItem } from '@/features/hospital-admin/securitySettingsTypes';

interface ComplianceStatusCardProps {
  items: ComplianceItem[];
  onViewDetails?: () => void;
}

export const ComplianceStatusCard: React.FC<ComplianceStatusCardProps> = ({
  items,
  onViewDetails,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 tracking-tight">
              Compliance Status
            </h3>
          </div>

          <button
            type="button"
            onClick={onViewDetails}
            className="text-xs font-semibold text-[#0066FF] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Compliance Checklist */}
        <div className="space-y-2 pt-0.5">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-0.5 text-xs gap-2"
            >
              <div className="flex items-center gap-2 min-w-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium text-slate-700 truncate text-[11.5px]">
                  {item.title}
                </span>
              </div>

              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0] shrink-0">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
