'use client';

import React from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';

interface EmergencyLookupSidebarCardProps {
  onOpenEmergency: () => void;
}

export function EmergencyLookupSidebarCard({
  onOpenEmergency,
}: EmergencyLookupSidebarCardProps) {
  return (
    <div className="bg-rose-50/60 border border-rose-100 rounded-2xl p-5 space-y-3.5">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
          <AlertTriangle className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900 leading-tight">
            Emergency Lookup
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-1 leading-snug">
            Need immediate access to a patient&apos;s critical information?
          </p>
        </div>
      </div>

      <button
        onClick={onOpenEmergency}
        className="w-full py-2.5 px-4 bg-white hover:bg-rose-100/60 text-red-600 border border-rose-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-2xs group cursor-pointer"
      >
        <span>Open Emergency Lookup</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  );
}
