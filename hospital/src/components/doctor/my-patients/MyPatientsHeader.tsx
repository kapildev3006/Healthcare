'use client';

import React from 'react';
import { Users, Building2, Clock } from 'lucide-react';

interface MyPatientsHeaderProps {
  hospitalName?: string;
  hospitalLocation?: string;
  dateStr?: string;
  timeStr?: string;
}

export function MyPatientsHeader({
  hospitalName = 'CityCare Hospital',
  hospitalLocation = 'Noida, Uttar Pradesh',
  dateStr = 'Tue, 16 Sep 2026',
  timeStr = '10:24 AM',
}: MyPatientsHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-1">
      {/* Title & Users Icon */}
      <div className="flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 shadow-xs">
          <Users className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 leading-tight">
            My Patients
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Patients you have access to and are currently managing.
          </p>
        </div>
      </div>

      {/* Hospital Location & Live DateTime */}
      <div className="flex items-center gap-6 text-right shrink-0">
        {/* Hospital Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-slate-800 leading-tight">
              {hospitalName}
            </p>
            <p className="text-xs text-slate-500 leading-tight mt-0.5">
              {hospitalLocation}
            </p>
          </div>
        </div>

        <div className="h-8 w-px bg-slate-200 hidden sm:block" />

        {/* Date & Time Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-500 shrink-0">
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-left">
            <p className="text-xs font-semibold text-slate-700 leading-tight">
              {dateStr}
            </p>
            <p className="text-xs text-slate-500 leading-tight mt-0.5 font-medium">
              {timeStr}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
