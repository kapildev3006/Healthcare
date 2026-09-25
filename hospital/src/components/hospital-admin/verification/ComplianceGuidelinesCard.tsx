'use client';

import React from 'react';
import { ShieldCheck, Info, CheckCircle2 } from 'lucide-react';

export const ComplianceGuidelinesCard: React.FC = () => {
  const guidelines = [
    'Verify original degree certificates',
    'Confirm medical council registration',
    'Run background checks',
    'Ensure documents are valid and not expired',
    'Contact issuing authority if required',
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center gap-2 pb-3.5 mb-3 border-b border-slate-100">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" strokeWidth={2.2} />
          </div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Compliance & Guidelines
          </h3>
        </div>

        {/* Info Callout Box */}
        <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100/80 flex items-start gap-2.5 mb-4">
          <div className="w-5 h-5 rounded-full bg-[#0066FF] text-white flex items-center justify-center shrink-0 mt-0.5">
            <Info className="w-3.5 h-3.5" />
          </div>
          <div className="text-xs text-slate-700 leading-relaxed">
            <p className="font-bold text-slate-900">
              Verification Guidelines
            </p>
            <p className="text-slate-600 text-[11.5px] mt-0.5 leading-snug">
              Ensure all doctor credentials are verified in accordance with hospital policy and national medical council regulations.
            </p>
          </div>
        </div>

        {/* Checklist */}
        <div className="space-y-2.5">
          {guidelines.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2.5 text-xs">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
              <span className="text-slate-700 font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
