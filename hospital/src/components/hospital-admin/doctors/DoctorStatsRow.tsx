'use client';

import React from 'react';
import Link from 'next/link';
import {
  Stethoscope,
  UserCheck,
  Clock,
  UserMinus,
  Plus,
} from 'lucide-react';
import { DoctorStats } from '../../../features/hospital-admin/doctorTypes';

interface DoctorStatsRowProps {
  stats: DoctorStats;
  onAddDoctor: () => void;
}

export const DoctorStatsRow: React.FC<DoctorStatsRowProps> = ({
  stats,
  onAddDoctor,
}) => {
  return (
    <div className="flex flex-col xl:flex-row xl:items-center gap-4 mb-6">
      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
        {/* 1. Total Doctors */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between hover:border-blue-200 transition-all">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#EAF2FD] text-[#1877F2] flex items-center justify-center shrink-0">
            <Stethoscope className="w-5 h-5" strokeWidth={2.2} />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">
                {stats.totalDoctors}
              </span>
              <span className="text-[12px] font-semibold text-[#16A34A] flex items-center">
                {stats.totalTrend}
              </span>
            </div>
            <span className="text-[12px] font-medium text-slate-500 mt-0.5">
              Total Doctors
            </span>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
          Across all departments
        </div>
      </div>

      {/* 2. Active Doctors */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between hover:border-blue-200 transition-all">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0">
            <UserCheck className="w-5 h-5" strokeWidth={2.2} />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">
                {stats.activeDoctors}
              </span>
              <span className="text-[12px] font-semibold text-[#16A34A] flex items-center">
                {stats.activeTrend}
              </span>
            </div>
            <span className="text-[12px] font-medium text-slate-500 mt-0.5">
              Active Doctors
            </span>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
          Currently practicing
        </div>
      </div>

      {/* 3. On Leave */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between hover:border-blue-200 transition-all">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#FFF4E5] text-[#F59E0B] flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" strokeWidth={2.2} />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">
                {stats.onLeave}
              </span>
              <span className="text-[12px] font-semibold text-slate-400">
                —
              </span>
            </div>
            <span className="text-[12px] font-medium text-slate-500 mt-0.5">
              On Leave
            </span>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
          Temporary absence
        </div>
      </div>

      {/* 4. Inactive */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between hover:border-blue-200 transition-all">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#FEECEC] text-[#EF4444] flex items-center justify-center shrink-0">
            <UserMinus className="w-5 h-5" strokeWidth={2.2} />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">
                {stats.inactive}
              </span>
              <span className="text-[12px] font-semibold text-[#EF4444] flex items-center">
                {stats.inactiveTrend}
              </span>
            </div>
            <span className="text-[12px] font-medium text-slate-500 mt-0.5">
              Inactive
            </span>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
          Not in service
        </div>
      </div>
      </div>

      {/* Action Button: Compact, properly sized matching reference */}
      <div className="flex items-center justify-end shrink-0">
        <Link
          href="/hospital-admin/doctors/add"
          className="h-[42px] px-5 rounded-xl bg-[#0066FF] hover:bg-blue-600 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-98 transition-all whitespace-nowrap"
        >
          <Plus className="w-4 h-4" strokeWidth={2.4} />
          <span>Add Doctor</span>
        </Link>
      </div>
    </div>
  );
};
