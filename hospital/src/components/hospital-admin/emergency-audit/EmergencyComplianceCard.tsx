'use client';

import React from 'react';
import { ShieldCheck, CheckCircle2, Info } from 'lucide-react';
import { EmergencyComplianceItem } from '@/features/hospital-admin/emergencyAuditTypes';

interface EmergencyComplianceCardProps {
  items: EmergencyComplianceItem[];
}

export const EmergencyComplianceCard: React.FC<EmergencyComplianceCardProps> = ({
  items,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-4 pb-2 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 tracking-tight">
            Emergency Access Compliance
          </h3>
        </div>

        {/* Compliance Checklist Items */}
        <div className="space-y-2.5 pt-1">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between text-xs py-0.5 gap-2"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium text-slate-700 truncate text-[11.5px]">
                  {item.title}
                </span>
              </div>

              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0] shrink-0">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Regulatory Note Callout */}
      <div className="mt-4 p-3 rounded-xl bg-blue-50/60 border border-blue-100/80 flex items-start gap-2.5">
        <div className="w-4 h-4 rounded-full bg-blue-100 text-[#0066FF] flex items-center justify-center shrink-0 mt-0.5">
          <Info className="w-3 h-3" />
        </div>
        <p className="text-[11px] text-slate-600 leading-relaxed">
          All emergency access events are logged and reviewed in accordance with hospital policy and regulatory requirements.
        </p>
      </div>
    </div>
  );
};
