'use client';

import React from 'react';
import { Info } from 'lucide-react';

export function EmergencyDisclaimerBanner() {
  return (
    <div className="p-3.5 bg-blue-50/80 border border-blue-200/70 rounded-xl flex items-center gap-3 text-xs text-blue-900 shadow-2xs">
      <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
        <Info className="w-3.5 h-3.5" />
      </div>
      <p className="font-medium leading-relaxed">
        This information is provided for emergency care. Please verify with the patient and use clinical judgment.
      </p>
    </div>
  );
}
