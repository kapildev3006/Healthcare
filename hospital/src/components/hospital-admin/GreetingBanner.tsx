'use client';

import React from 'react';

interface GreetingBannerProps {
  adminName?: string;
  hospitalName?: string;
  dateString?: string;
}

export const GreetingBanner: React.FC<GreetingBannerProps> = ({
  adminName = 'Rajesh Kumar',
  hospitalName = 'CityCare Hospital',
  dateString = 'Thursday, 12 June 2025',
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
      {/* Greeting Title */}
      <div>
        <h1 className="text-2xl sm:text-[26px] font-bold text-slate-900 tracking-tight">
          Good morning, {adminName}
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Here&apos;s what&apos;s happening at {hospitalName} today.
        </p>
      </div>

      {/* Date & Subtext */}
      <div className="text-left sm:text-right">
        <p className="text-sm font-medium text-slate-600">
          {dateString}
        </p>
        <p className="text-xs text-slate-400">
          Keep our hospital safe, compliant and efficient.
        </p>
      </div>
    </div>
  );
};
