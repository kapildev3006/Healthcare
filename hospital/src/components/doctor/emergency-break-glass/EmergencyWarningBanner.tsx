'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';

export function EmergencyWarningBanner() {
  return (
    <div className="bg-red-50/70 border border-red-100 rounded-2xl p-4 flex items-start gap-3.5 transition-all">
      <div className="p-1 rounded-lg bg-red-100/70 text-red-600 shrink-0 mt-0.5">
        <AlertTriangle className="w-5 h-5 fill-red-500/20 text-red-600" />
      </div>
      <div>
        <h4 className="text-sm font-bold text-red-600 leading-tight">
          This feature is for true emergency situations only.
        </h4>
        <p className="text-xs text-red-600/90 font-medium mt-1 leading-relaxed">
          All emergency access is strictly audited and the patient will be notified after access. Misuse may result in disciplinary action.
        </p>
      </div>
    </div>
  );
}
