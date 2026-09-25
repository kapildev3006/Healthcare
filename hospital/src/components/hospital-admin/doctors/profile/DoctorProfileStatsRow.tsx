'use client';

import React from 'react';
import { Users, Calendar, FileText, Star, Clock } from 'lucide-react';
import { DoctorProfileStats } from '@/features/hospital-admin/doctorProfileTypes';

interface DoctorProfileStatsRowProps {
  stats: DoctorProfileStats;
}

export const DoctorProfileStatsRow: React.FC<DoctorProfileStatsRowProps> = ({
  stats,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {/* 1. Total Patients */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between hover:border-blue-200 transition-all">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" strokeWidth={2.2} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-slate-500 font-medium">Total Patients</p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">
                {stats.totalPatients.toLocaleString()}
              </span>
              <span className="text-xs font-semibold text-emerald-600">
                {stats.totalPatientsTrend}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Across all time</p>
          </div>
        </div>
      </div>

      {/* 2. Appointments (This Month) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between hover:border-blue-200 transition-all">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" strokeWidth={2.2} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-slate-500 font-medium">
              Appointments (This Month)
            </p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">
                {stats.appointmentsThisMonth}
              </span>
              <span className="text-xs font-semibold text-emerald-600">
                {stats.appointmentsTrend}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 truncate">
              Completed: {stats.appointmentsCompleted} | Cancelled:{' '}
              {stats.appointmentsCancelled}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Active Case Load */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between hover:border-blue-200 transition-all">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" strokeWidth={2.2} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-slate-500 font-medium">Active Case Load</p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">
                {stats.activeCaseLoad}
              </span>
              <span className="text-xs font-semibold text-emerald-600">
                {stats.activeCaseLoadTrend}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Currently under care</p>
          </div>
        </div>
      </div>

      {/* 4. Patient Satisfaction */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between hover:border-blue-200 transition-all">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
            <Star className="w-5 h-5 fill-amber-500" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-slate-500 font-medium">
              Patient Satisfaction
            </p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">
                {stats.patientSatisfaction.toFixed(1)} /{' '}
                <span className="text-slate-400 text-lg font-normal">5.0</span>
              </span>
              <span className="text-xs font-semibold text-emerald-600">
                {stats.patientSatisfactionTrend}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Based on {stats.totalReviews} reviews
            </p>
          </div>
        </div>
      </div>

      {/* 5. Average Consultation Time */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between hover:border-blue-200 transition-all">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" strokeWidth={2.2} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-slate-500 font-medium">
              Average Consultation Time
            </p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">
                {stats.avgConsultationTime} mins
              </span>
              <span className="text-xs font-semibold text-emerald-600">
                {stats.avgConsultationTrend}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Hospital average: {stats.hospitalAvgConsultation} mins
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
