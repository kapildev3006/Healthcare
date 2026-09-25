'use client';

import React from 'react';
import { Layers } from 'lucide-react';

const steps = [
  'Your request is logged with time, reason, and details.',
  'You get temporary access to critical patient data.',
  'The patient is notified via app once they are available.',
  'All access is audited for compliance and safety.',
];

export function WhatHappensNextCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3.5">
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <Layers className="w-4 h-4" />
        </div>
        <h3 className="text-sm font-bold text-slate-900">
          What Happens Next?
        </h3>
      </div>

      {/* Numbered Steps */}
      <div className="space-y-3">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-blue-100/90 text-blue-700 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
              {idx + 1}
            </span>
            <p className="text-xs text-slate-700 leading-snug">
              {step}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
