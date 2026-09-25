'use client';

import React from 'react';
import { Info, CheckCircle2 } from 'lucide-react';

const guidelinesList = [
  'Life-threatening situations',
  'Patient unconscious or unable to provide consent',
  'No family member or caregiver available',
  'Critical treatment decisions required immediately',
  'Access to allergies, medications, or medical history is essential',
];

export function WhenToUseCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3.5">
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <Info className="w-4 h-4" />
        </div>
        <h3 className="text-sm font-bold text-slate-900">
          When to Use Emergency Access?
        </h3>
      </div>

      {/* Guidelines List */}
      <ul className="space-y-2.5">
        {guidelinesList.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-snug">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-100 shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
