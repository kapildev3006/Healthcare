'use client';

import React from 'react';
import { Bell } from 'lucide-react';
import { DoctorRecentActivityItem } from '@/features/doctor/doctorDashboardTypes';

interface RecentActivityCardProps {
  activities: DoctorRecentActivityItem[];
  onViewAll?: () => void;
  onSelectActivity?: (activity: DoctorRecentActivityItem) => void;
}

export function RecentActivityCard({
  activities,
  onViewAll,
  onSelectActivity,
}: RecentActivityCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Bell className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-slate-900">Recent Activity</h2>
        </div>
        <button
          onClick={onViewAll}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          View All
        </button>
      </div>

      {/* Activity Timeline List */}
      <div className="pt-3 space-y-3">
        {activities.map((act) => (
          <div
            key={act.id}
            onClick={() => onSelectActivity?.(act)}
            className="flex items-start gap-3 p-1.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group"
          >
            {/* Dot Indicator */}
            <div className="mt-1.5 shrink-0">
              <span
                className={`block w-2.5 h-2.5 rounded-full ${
                  act.isAlert
                    ? 'bg-red-500 ring-4 ring-red-100'
                    : 'bg-blue-600 ring-4 ring-blue-100'
                }`}
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs sm:text-sm font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                  {act.title}
                </p>
                <span className="text-[11px] font-medium text-slate-400 whitespace-nowrap">
                  {act.timestamp}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                {act.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
