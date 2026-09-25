'use client';

import React from 'react';
import { Users, Calendar, CheckCircle2, UserPlus, TrendingUp } from 'lucide-react';
import { MyPatientsStats } from '@/features/doctor/myPatientsTypes';

interface MyPatientsStatsRowProps {
  stats: MyPatientsStats;
}

export function MyPatientsStatsRow({ stats }: MyPatientsStatsRowProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Total Patients */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center gap-4 transition-all hover:shadow-sm">
        <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <Users className="w-6 h-6" />
        </div>
        <div className="min-w-0">
          <p className="text-2xl font-bold text-slate-900 leading-tight">
            {stats.totalPatients}
          </p>
          <p className="text-xs text-slate-600 font-medium mt-0.5">
            Total Patients
          </p>
          <p className="text-xs text-emerald-600 font-semibold mt-0.5 flex items-center gap-1">
            <span>{stats.totalPatientsTrend}</span>
          </p>
        </div>
      </div>

      {/* 2. Active Treatments */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center gap-4 transition-all hover:shadow-sm">
        <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <Calendar className="w-6 h-6" />
        </div>
        <div className="min-w-0">
          <p className="text-2xl font-bold text-slate-900 leading-tight">
            {stats.activeTreatments}
          </p>
          <p className="text-xs text-slate-600 font-medium mt-0.5">
            Active Treatments
          </p>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            {stats.activeTreatmentsSubtitle}
          </p>
        </div>
      </div>

      {/* 3. Follow-ups Due */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center gap-4 transition-all hover:shadow-sm">
        <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div className="min-w-0">
          <p className="text-2xl font-bold text-slate-900 leading-tight">
            {stats.followupsDue}
          </p>
          <p className="text-xs text-slate-600 font-medium mt-0.5">
            Follow-ups Due
          </p>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            {stats.followupsDueSubtitle}
          </p>
        </div>
      </div>

      {/* 4. New This Month */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center gap-4 transition-all hover:shadow-sm">
        <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <UserPlus className="w-6 h-6" />
        </div>
        <div className="min-w-0">
          <p className="text-2xl font-bold text-slate-900 leading-tight">
            {stats.newThisMonth}
          </p>
          <p className="text-xs text-slate-600 font-medium mt-0.5">
            New This Month
          </p>
          <p className="text-xs text-emerald-600 font-semibold mt-0.5 flex items-center gap-1">
            <span>{stats.newThisMonthTrend}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
