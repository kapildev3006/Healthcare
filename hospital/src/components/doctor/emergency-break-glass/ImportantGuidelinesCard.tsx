'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';

const importantRules = [
  'Use only in genuine emergencies.',
  'Access is temporary and limited to critical data.',
  'Patient will be notified after access.',
  'All actions are audited and monitored.',
  'Misuse may lead to disciplinary action.',
];

export function ImportantGuidelinesCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3.5">
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
        <h3 className="text-sm font-bold text-red-600">
          Important
        </h3>
      </div>

      {/* Bullet Points */}
      <ul className="space-y-2">
        {importantRules.map((rule, idx) => (
          <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-snug">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-1.5" />
            <span>{rule}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
