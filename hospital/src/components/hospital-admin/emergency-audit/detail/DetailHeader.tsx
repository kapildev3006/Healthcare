'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const DetailHeader: React.FC = () => {
  return (
    <div className="space-y-3">
      {/* Back button */}
      <div>
        <Link
          href="/hospital-admin/emergency-access"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0066FF] hover:underline transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Emergency Access Audit</span>
        </Link>
      </div>

      {/* Main Title & Subtitle + Date Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Emergency Access Audit Detail
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Review and manage this emergency access event. Ensure compliance and proper documentation.
          </p>
        </div>

        <div className="text-left sm:text-right">
          <p className="text-xs sm:text-sm font-semibold text-slate-700">
            Thursday, 12 June 2025
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Keep our hospital safe, compliant and efficient.
          </p>
        </div>
      </div>
    </div>
  );
};
