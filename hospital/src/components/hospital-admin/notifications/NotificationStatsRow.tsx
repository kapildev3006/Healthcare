'use client';

import React from 'react';
import { Bell, AlertTriangle, FileText, TrendingUp } from 'lucide-react';
import { NotificationStatMetrics } from '@/features/hospital-admin/notificationTypes';

interface NotificationStatsRowProps {
  stats: NotificationStatMetrics;
  onStatClick?: (type: string) => void;
}

export const NotificationStatsRow: React.FC<NotificationStatsRowProps> = ({
  stats,
  onStatClick,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Unread Notifications */}
      <div
        onClick={() => onStatClick?.('unread')}
        className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex items-center gap-3.5 hover:border-blue-200 transition-all cursor-pointer group"
      >
        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          <Bell className="w-6 h-6 stroke-[2.2]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-slate-500 font-medium">Unread Notifications</p>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              {stats.unreadCount}
            </span>
            <span className="text-xs font-semibold text-emerald-600">
              {stats.unreadTrend}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5 truncate">
            {stats.unreadSub}
          </p>
        </div>
      </div>

      {/* 2. High Priority Alerts */}
      <div
        onClick={() => onStatClick?.('high-priority')}
        className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex items-center gap-3.5 hover:border-rose-200 transition-all cursor-pointer group"
      >
        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#EF4444] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          <AlertTriangle className="w-6 h-6 stroke-[2.2]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-slate-500 font-medium">High Priority Alerts</p>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              {stats.highPriorityCount}
            </span>
            <span className="text-xs font-semibold text-rose-500">
              {stats.highPriorityTrend}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5 truncate">
            {stats.highPrioritySub}
          </p>
        </div>
      </div>

      {/* 3. Verification Updates */}
      <div
        onClick={() => onStatClick?.('verification')}
        className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex items-center gap-3.5 hover:border-emerald-200 transition-all cursor-pointer group"
      >
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          <FileText className="w-6 h-6 stroke-[2.2]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-slate-500 font-medium">Verification Updates</p>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              {stats.verificationUpdatesCount}
            </span>
            <span className="text-xs font-semibold text-emerald-600">
              {stats.verificationTrend}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5 truncate">
            {stats.verificationSub}
          </p>
        </div>
      </div>

      {/* 4. Audit Events */}
      <div
        onClick={() => onStatClick?.('audit')}
        className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex items-center gap-3.5 hover:border-purple-200 transition-all cursor-pointer group"
      >
        <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          <TrendingUp className="w-6 h-6 stroke-[2.2]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-slate-500 font-medium">Audit Events</p>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              {stats.auditEventsCount}
            </span>
            <span className="text-xs font-semibold text-emerald-600">
              {stats.auditTrend}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5 truncate">
            {stats.auditSub}
          </p>
        </div>
      </div>
    </div>
  );
};
