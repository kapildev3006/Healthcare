'use client';

import React from 'react';
import Link from 'next/link';
import {
  Zap,
  Search,
  AlertTriangle,
  UserCheck,
  CalendarDays,
} from 'lucide-react';

interface MyPatientsQuickActionsCardProps {
  onRequestAccessClick?: () => void;
  onCreateEncounterClick?: () => void;
}

export function MyPatientsQuickActionsCard({
  onRequestAccessClick,
  onCreateEncounterClick,
}: MyPatientsQuickActionsCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3.5">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4 text-blue-600 fill-blue-600" />
        <h3 className="text-sm font-bold text-slate-900">
          Quick Actions
        </h3>
      </div>

      {/* Action Items Grid */}
      <div className="space-y-2.5">
        {/* 1. Search Patient */}
        <Link
          href="/doctor/patient-search"
          className="flex items-center gap-3 p-2.5 rounded-xl border border-blue-100/80 bg-blue-50/40 hover:bg-blue-50 hover:border-blue-200 transition-all group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Search className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              Search Patient
            </p>
            <p className="text-[11px] text-slate-500 font-normal">
              Find and view patient records
            </p>
          </div>
        </Link>

        {/* 2. Emergency Lookup */}
        <Link
          href="/doctor/emergency-lookup"
          className="flex items-center gap-3 p-2.5 rounded-xl border border-red-100/80 bg-red-50/40 hover:bg-red-50 hover:border-red-200 transition-all group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-900 group-hover:text-red-600 transition-colors">
              Emergency Lookup
            </p>
            <p className="text-[11px] text-slate-500 font-normal">
              Access critical information
            </p>
          </div>
        </Link>

        {/* 3. Request Patient Access */}
        <button
          type="button"
          onClick={onRequestAccessClick}
          className="w-full text-left flex items-center gap-3 p-2.5 rounded-xl border border-blue-100/80 bg-blue-50/40 hover:bg-blue-50 hover:border-blue-200 transition-all group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <UserCheck className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              Request Patient Access
            </p>
            <p className="text-[11px] text-slate-500 font-normal">
              Send access request for a patient
            </p>
          </div>
        </button>

        {/* 4. Create New Encounter */}
        <button
          type="button"
          onClick={onCreateEncounterClick}
          className="w-full text-left flex items-center gap-3 p-2.5 rounded-xl border border-emerald-100/80 bg-emerald-50/40 hover:bg-emerald-50 hover:border-emerald-200 transition-all group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <CalendarDays className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
              Create New Encounter
            </p>
            <p className="text-[11px] text-slate-500 font-normal">
              Start a new consultation
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
