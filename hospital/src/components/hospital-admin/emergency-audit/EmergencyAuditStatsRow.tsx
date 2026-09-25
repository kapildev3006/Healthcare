'use client';

import React from 'react';
import { AlertTriangle, Clock, Users, FileText } from 'lucide-react';
import { EmergencyAuditStat } from '@/features/hospital-admin/emergencyAuditTypes';

interface EmergencyAuditStatsRowProps {
  stats: EmergencyAuditStat;
  onCardClick?: (cardType: string) => void;
}

export const EmergencyAuditStatsRow: React.FC<EmergencyAuditStatsRowProps> = ({
  stats,
  onCardClick,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Emergency Events Today */}
      <div
        onClick={() => onCardClick?.('events')}
        className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex items-center gap-3.5 hover:border-red-200 transition-all cursor-pointer group"
      >
        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          <AlertTriangle className="w-6 h-6" strokeWidth={2.2} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-slate-500 font-medium">Emergency Events Today</p>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              {stats.emergencyEventsToday}
            </span>
            <span className="text-xs font-semibold text-rose-500">
              {stats.emergencyEventsTrend}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5 truncate">
            {stats.emergencyEventsSub}
          </p>
        </div>
      </div>

      {/* 2. Active Break-Glass Sessions */}
      <div
        onClick={() => onCardClick?.('active')}
        className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex items-center gap-3.5 hover:border-blue-200 transition-all cursor-pointer group"
      >
        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          <Clock className="w-6 h-6" strokeWidth={2.2} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-slate-500 font-medium">Active Break-Glass Sessions</p>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              {stats.activeSessions}
            </span>
            <span className="text-xs font-semibold text-emerald-600">
              {stats.activeSessionsTrend}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5 truncate">
            {stats.activeSessionsSub}
          </p>
        </div>
      </div>

      {/* 3. High-Risk Cases */}
      <div
        onClick={() => onCardClick?.('high-risk')}
        className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex items-center gap-3.5 hover:border-red-200 transition-all cursor-pointer group"
      >
        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          <Users className="w-6 h-6" strokeWidth={2.2} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-slate-500 font-medium">High-Risk Cases</p>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              {stats.highRiskCases}
            </span>
            <span className="text-xs font-semibold text-rose-500">
              {stats.highRiskCasesTrend}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5 truncate">
            {stats.highRiskCasesSub}
          </p>
        </div>
      </div>

      {/* 4. Awaiting Review */}
      <div
        onClick={() => onCardClick?.('awaiting')}
        className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex items-center gap-3.5 hover:border-amber-200 transition-all cursor-pointer group"
      >
        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          <FileText className="w-6 h-6" strokeWidth={2.2} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-slate-500 font-medium">Awaiting Review</p>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              {stats.awaitingReview}
            </span>
            <span className="text-xs font-semibold text-rose-500">
              {stats.awaitingReviewTrend}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5 truncate">
            {stats.awaitingReviewSub}
          </p>
        </div>
      </div>
    </div>
  );
};
