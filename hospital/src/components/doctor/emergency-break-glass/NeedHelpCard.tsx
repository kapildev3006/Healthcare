'use client';

import React from 'react';
import { HelpCircle } from 'lucide-react';

export function NeedHelpCard() {
  return (
    <div className="bg-[#f0f7ff]/60 border border-blue-100/90 rounded-2xl p-5 shadow-xs space-y-2.5">
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
          <HelpCircle className="w-4 h-4" />
        </div>
        <h3 className="text-sm font-bold text-slate-900">
          Need Help?
        </h3>
      </div>

      {/* Description */}
      <p className="text-xs text-slate-600 leading-relaxed font-normal">
        If you are unsure whether to use emergency access, contact your department head or hospital administrator.
      </p>
    </div>
  );
}
