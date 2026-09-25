'use client';

import React from 'react';
import { Shield } from 'lucide-react';

interface VerificationSummaryCardProps {
  score?: number;
  statusLabel?: string;
  verifiedCount?: number;
  totalCount?: number;
  caption?: string;
}

export const VerificationSummaryCard: React.FC<
  VerificationSummaryCardProps
> = ({
  score = 80,
  statusLabel = 'Good',
  verifiedCount = 4,
  totalCount = 5,
  caption = 'All critical documents are valid. Please review remaining items.',
}) => {
  // SVG Donut calculation
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
      {/* Header */}
      <div className="flex items-center gap-2 pb-3.5 mb-4 border-b border-slate-100">
        <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
          <Shield className="w-4 h-4" strokeWidth={2.4} />
        </div>
        <h3 className="text-sm font-bold text-slate-900 tracking-tight">
          Verification Summary
        </h3>
      </div>

      {/* Donut Gauge + Stats Row */}
      <div className="flex items-center gap-4">
        {/* Circular SVG Donut */}
        <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Background Track */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="text-slate-100"
              strokeWidth="9"
              stroke="currentColor"
              fill="transparent"
            />
            {/* Animated / Progress Track */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="text-[#0066FF] transition-all duration-1000 ease-out"
              strokeWidth="9"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>
          {/* Centered Percentage */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              {score}%
            </span>
          </div>
        </div>

        {/* Right Score Details */}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-slate-500">
            Verification Score
          </p>
          <p className="text-lg font-bold text-[#16A34A] tracking-tight mt-0.5">
            {statusLabel}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {verifiedCount} of {totalCount} key items verified
          </p>
        </div>
      </div>

      {/* Advisory Caption */}
      <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 leading-relaxed">
        {caption}
      </div>
    </div>
  );
};
