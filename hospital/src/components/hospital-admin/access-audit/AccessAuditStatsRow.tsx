'use client';

import React from 'react';
import { Smartphone, Users, AlertTriangle, Clock } from 'lucide-react';
import { AccessAuditStat } from '@/features/hospital-admin/accessAuditTypes';

interface AccessAuditStatsRowProps {
  stats: AccessAuditStat;
  onCardClick?: (cardType: string) => void;
}

export const AccessAuditStatsRow: React.FC<AccessAuditStatsRowProps> = ({
  stats,
  onCardClick,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Total Access Events Today */}
      <div
        onClick={() => onCardClick && onCardClick('total')}
        className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex items-center gap-3.5 hover:border-blue-200 transition-all cursor-pointer group"
      >
        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          <Smartphone className="w-6 h-6" strokeWidth={2.2} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-slate-500 font-medium">Total Access Events Today</p>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              {stats.totalEventsToday}
            </span>
            <span className="text-xs font-semibold text-emerald-600">
              {stats.totalEventsTrend}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5 truncate">
            {stats.totalEventsSub}
          </p>
        </div>
      </div>

      {/* 2. Standard Accesses */}
      <div
        onClick={() => onCardClick && onCardClick('standard')}
        className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex items-center gap-3.5 hover:border-blue-200 transition-all cursor-pointer group"
      >
        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          <Users className="w-6 h-6" strokeWidth={2.2} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-slate-500 font-medium">Standard Accesses</p>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              {stats.standardAccesses}
            </span>
            <span className="text-xs font-semibold text-emerald-600">
              {stats.standardAccessesTrend}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5 truncate">
            {stats.standardAccessesSub}
          </p>
        </div>
      </div>

      {/* 3. Flagged Events */}
      <div
        onClick={() => onCardClick && onCardClick('flagged')}
        className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex items-center gap-3.5 hover:border-red-200 transition-all cursor-pointer group"
      >
        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          <AlertTriangle className="w-6 h-6" strokeWidth={2.2} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-slate-500 font-medium">Flagged Events</p>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              {stats.flaggedEvents}
            </span>
            <span className="text-xs font-semibold text-rose-500">
              {stats.flaggedEventsTrend}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5 truncate">
            {stats.flaggedEventsSub}
          </p>
        </div>
      </div>

      {/* 4. Active Sessions */}
      <div
        onClick={() => onCardClick && onCardClick('sessions')}
        className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex items-center gap-3.5 hover:border-blue-200 transition-all cursor-pointer group"
      >
        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          <Clock className="w-6 h-6" strokeWidth={2.2} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-slate-500 font-medium">Active Sessions</p>
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
    </div>
  );
};
