'use client';

import React from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';

interface PatientDataSecureCardProps {
  onViewAccessPolicy?: () => void;
}

export function PatientDataSecureCard({
  onViewAccessPolicy,
}: PatientDataSecureCardProps) {
  return (
    <div className="bg-emerald-50/40 border border-emerald-100/90 rounded-2xl p-5 shadow-xs space-y-3">
      {/* Icon + Title */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <h3 className="text-sm font-bold text-slate-900">
          Patient Data is Secure
        </h3>
      </div>

      {/* Description */}
      <p className="text-xs text-slate-600 leading-relaxed">
        You can only view patients with explicit access and consent.
      </p>

      {/* Access Policy Link */}
      <button
        type="button"
        onClick={onViewAccessPolicy}
        className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 transition-colors cursor-pointer"
      >
        <span>View Access Policy</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
