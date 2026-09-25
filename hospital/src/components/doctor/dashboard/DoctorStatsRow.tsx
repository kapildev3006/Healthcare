'use client';

import React from 'react';
import { Users, Calendar, Siren, FileText, ArrowUpRight } from 'lucide-react';
import { DoctorDashboardStats } from '@/features/doctor/doctorDashboardTypes';

interface DoctorStatsRowProps {
  stats: DoctorDashboardStats;
}

export function DoctorStatsRow({ stats }: DoctorStatsRowProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Today's Patients */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4 hover:shadow-sm transition-shadow">
        <div className="w-13 h-13 rounded-2xl bg-sky-50 border border-sky-100/80 flex items-center justify-center text-sky-600 shrink-0">
          <Users className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none mb-1">
            {stats.todayPatients.count}
          </div>
          <p className="text-sm font-semibold text-slate-700 leading-tight">
            Today&apos;s Patients
          </p>
          <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 mt-1">
            <span>↑</span>
            <span>{stats.todayPatients.trendText}</span>
          </div>
        </div>
      </div>

      {/* 2. Upcoming Appointments */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4 hover:shadow-sm transition-shadow">
        <div className="w-13 h-13 rounded-2xl bg-blue-50 border border-blue-100/80 flex items-center justify-center text-blue-600 shrink-0">
          <Calendar className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none mb-1">
            {stats.upcomingAppointments.count}
          </div>
          <p className="text-sm font-semibold text-slate-700 leading-tight">
            Upcoming Appointments
          </p>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Next: {stats.upcomingAppointments.nextTime}
          </p>
        </div>
      </div>

      {/* 3. Emergency Cases */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4 hover:shadow-sm transition-shadow">
        <div className="w-13 h-13 rounded-2xl bg-red-50 border border-red-100/80 flex items-center justify-center text-red-600 shrink-0">
          <Siren className="w-6 h-6 animate-pulse" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none mb-1">
            {stats.emergencyCases.count}
          </div>
          <p className="text-sm font-semibold text-slate-700 leading-tight">
            Emergency Cases
          </p>
          <p className="text-xs text-slate-500 font-medium mt-1">
            {stats.emergencyCases.periodText}
          </p>
        </div>
      </div>

      {/* 4. Pending Reports */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4 hover:shadow-sm transition-shadow">
        <div className="w-13 h-13 rounded-2xl bg-indigo-50 border border-indigo-100/80 flex items-center justify-center text-indigo-600 shrink-0">
          <FileText className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none mb-1">
            {stats.pendingReports.count}
          </div>
          <p className="text-sm font-semibold text-slate-700 leading-tight">
            Pending Reports
          </p>
          <p className="text-xs text-slate-500 font-medium mt-1">
            {stats.pendingReports.statusText}
          </p>
        </div>
      </div>
    </div>
  );
}
