'use client';

import React from 'react';
import { AlertCircle, ArrowRight } from 'lucide-react';

interface CriticalAlertActionCardProps {
  onViewFullRecord: () => void;
  onRequestExtendedAccess: () => void;
}

export function CriticalAlertActionCard({
  onViewFullRecord,
  onRequestExtendedAccess,
}: CriticalAlertActionCardProps) {
  return (
    <div className="rounded-2xl border border-rose-200/80 shadow-xs overflow-hidden bg-white">
      {/* Red Alert Header Banner */}
      <div className="bg-red-600 text-white p-4.5 flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0 mt-0.5">
          <AlertCircle className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-sm font-bold leading-tight">
            Critical Information Available
          </h3>
          <p className="text-xs text-red-100 font-medium mt-1 leading-snug">
            This patient has important medical information you should review immediately.
          </p>
        </div>
      </div>

      {/* Buttons Body */}
      <div className="p-4 space-y-2.5">
        <button
          onClick={onViewFullRecord}
          className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2 group cursor-pointer"
        >
          <span>View Full Medical Record</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>

        <button
          onClick={onRequestExtendedAccess}
          className="w-full py-2.5 px-4 bg-blue-50/70 hover:bg-blue-100/80 text-blue-700 border border-blue-200/80 rounded-xl text-xs font-bold transition-colors cursor-pointer"
        >
          Request Extended Access
        </button>
      </div>
    </div>
  );
}
