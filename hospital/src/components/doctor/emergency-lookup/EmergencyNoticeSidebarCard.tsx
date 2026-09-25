'use client';

import React from 'react';
import { Zap, ArrowRight } from 'lucide-react';

interface EmergencyNoticeSidebarCardProps {
  onViewPolicy: () => void;
}

export function EmergencyNoticeSidebarCard({
  onViewPolicy,
}: EmergencyNoticeSidebarCardProps) {
  return (
    <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-5 space-y-2.5">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
          <Zap className="w-4 h-4 fill-current" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900 leading-tight">
            For Emergency Use Only
          </h3>
          <p className="text-xs text-slate-600 mt-1 leading-snug">
            Access patient&apos;s critical information in life-threatening situations. All access is logged.
          </p>
        </div>
      </div>

      <button
        onClick={onViewPolicy}
        className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 transition-colors group cursor-pointer pt-1"
      >
        <span>View Access Policy</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  );
}
