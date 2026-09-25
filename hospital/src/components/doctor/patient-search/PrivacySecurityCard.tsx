'use client';

import React from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';

interface PrivacySecurityCardProps {
  onViewPolicy: () => void;
}

export function PrivacySecurityCard({ onViewPolicy }: PrivacySecurityCardProps) {
  return (
    <div className="bg-emerald-50/40 border border-emerald-100/80 rounded-2xl p-5 space-y-3">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900 leading-tight">
            Privacy & Security
          </h3>
          <p className="text-xs text-slate-600 mt-1 leading-snug">
            Access patient records only for authorized care and with proper consent.
          </p>
        </div>
      </div>

      <button
        onClick={onViewPolicy}
        className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 transition-colors group cursor-pointer"
      >
        <span>View Access Policy</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  );
}
