'use client';

import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ComplianceStatusItem } from '../../features/hospital-admin/types';

interface ComplianceStatusCardProps {
  items: ComplianceStatusItem[];
}

export const ComplianceStatusCard: React.FC<ComplianceStatusCardProps> = ({ items }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center gap-2 pb-3.5 border-b border-slate-100">
          <ShieldCheck className="w-5 h-5 text-[#1877F2]" strokeWidth={2.2} />
          <h3 className="font-bold text-[14.5px] text-slate-900">
            Hospital Compliance / Security Status
          </h3>
        </div>

        {/* Status List */}
        <div className="mt-3 space-y-2.5">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-0.5"
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2
                  className="w-4 h-4 text-[#16A34A] shrink-0"
                  strokeWidth={2.4}
                />
                <span className="text-[12.5px] font-medium text-slate-700">
                  {item.label}
                </span>
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                  item.type === 'blue'
                    ? 'bg-[#E8F1FD] text-[#1E70E8]'
                    : 'bg-[#DCFCE7] text-[#16A34A]'
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
