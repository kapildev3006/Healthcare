'use client';

import React from 'react';
import { Lock, ArrowRight } from 'lucide-react';

interface RequestAccessCtaCardProps {
  onRequestAccess: () => void;
}

export function RequestAccessCtaCard({
  onRequestAccess,
}: RequestAccessCtaCardProps) {
  return (
    <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-5 space-y-3.5">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
          <Lock className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900 leading-tight">
            Need to Request Access?
          </h3>
          <p className="text-xs text-slate-600 mt-1 leading-snug">
            For non-emergency situations, please send a formal access request to the patient.
          </p>
        </div>
      </div>

      <button
        onClick={onRequestAccess}
        className="w-full py-2.5 px-4 bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-300/80 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-2xs group cursor-pointer"
      >
        <span>Request Patient Access</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  );
}
