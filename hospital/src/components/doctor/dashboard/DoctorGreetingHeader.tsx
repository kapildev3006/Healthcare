'use client';

import React from 'react';
import { Building2, Clock } from 'lucide-react';

interface DoctorGreetingHeaderProps {
  doctorName?: string;
  hospitalName?: string;
  hospitalLocation?: string;
  dateStr?: string;
  timeStr?: string;
}

export function DoctorGreetingHeader({
  doctorName = 'Dr. Kapil Dev',
  hospitalName = 'CityCare Hospital',
  hospitalLocation = 'Noida, Uttar Pradesh',
  dateStr = 'Tue, 16 Sep 2026',
  timeStr = '10:24 AM',
}: DoctorGreetingHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
      {/* Greeting Title & Subtitle */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          Good Morning, {doctorName} <span>👋</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-500 font-normal mt-1">
          Here&apos;s what&apos;s happening at {hospitalName} today.
        </p>
      </div>

      {/* Hospital Location & Live DateTime */}
      <div className="flex items-center gap-6 text-right">
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
            <p className="text-xs font-medium text-slate-500 leading-tight mt-0.5">
              {timeStr}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
