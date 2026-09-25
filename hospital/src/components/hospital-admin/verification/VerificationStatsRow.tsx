'use client';

import React from 'react';
import { FileClock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { VerificationStats } from '../../../features/hospital-admin/verificationTypes';

interface VerificationStatsRowProps {
  stats: VerificationStats;
}

export const VerificationStatsRow: React.FC<VerificationStatsRowProps> = ({
  stats,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* 1. Pending Reviews */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between hover:border-blue-200 transition-all">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#FEECEC] text-[#EF4444] flex items-center justify-center shrink-0">
            <FileClock className="w-5 h-5" strokeWidth={2.2} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[12px] font-medium text-slate-500">
              Pending Reviews
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">
                {stats.pendingReviews}
              </span>
              <span className="text-[12px] font-semibold text-[#EF4444] flex items-center">
                {stats.pendingTrend}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
          Awaiting verification
        </div>
      </div>

      {/* 2. Approved Today */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between hover:border-blue-200 transition-all">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0">
            <CheckCircle className="w-5 h-5" strokeWidth={2.2} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[12px] font-medium text-slate-500">
              Approved Today
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">
                {stats.approvedToday}
              </span>
              <span className="text-[12px] font-semibold text-[#16A34A] flex items-center">
                {stats.approvedTrend}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
          Doctors verified
        </div>
      </div>

      {/* 3. Rejected */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between hover:border-blue-200 transition-all">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#FEECEC] text-[#EF4444] flex items-center justify-center shrink-0">
            <XCircle className="w-5 h-5" strokeWidth={2.2} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[12px] font-medium text-slate-500">
              Rejected
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">
                {stats.rejected}
              </span>
              <span className="text-[12px] font-semibold text-[#EF4444] flex items-center">
                {stats.rejectedTrend}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
          Did not meet requirements
        </div>
      </div>

      {/* 4. Need More Info */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between hover:border-blue-200 transition-all">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5" strokeWidth={2.2} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[12px] font-medium text-slate-500">
              Need More Info
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">
                {stats.needMoreInfo}
              </span>
              <span className="text-[12px] font-semibold text-[#D97706] flex items-center">
                {stats.needMoreInfoTrend}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
          Additional documents required
        </div>
      </div>
    </div>
  );
};
