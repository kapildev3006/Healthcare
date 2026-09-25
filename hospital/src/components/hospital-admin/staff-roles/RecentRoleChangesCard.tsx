'use client';

import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { RecentRoleChangeItem } from '@/features/hospital-admin/staffRolesTypes';

interface RecentRoleChangesCardProps {
  changes: RecentRoleChangeItem[];
  onViewAll?: () => void;
}

export const RecentRoleChangesCard: React.FC<RecentRoleChangesCardProps> = ({
  changes,
  onViewAll,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">
              Recent Role Changes
            </h3>
          </div>

          <button
            type="button"
            onClick={onViewAll}
            className="text-xs font-semibold text-[#0066FF] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Changes List */}
        <div className="space-y-3.5">
          {changes.map((change) => (
            <div
              key={change.id}
              className="flex items-start justify-between gap-3 text-xs"
            >
              <div className="flex items-start gap-2.5 min-w-0">
                <span
                  className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                    change.dotColor === 'green'
                      ? 'bg-emerald-500'
                      : change.dotColor === 'blue'
                      ? 'bg-[#0066FF]'
                      : 'bg-amber-500'
                  }`}
                />
                <div className="min-w-0">
                  <p className="font-bold text-slate-800 leading-tight">
                    {change.staffName}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-tight">
                    {change.changeDescription}
                  </p>
                </div>
              </div>

              <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap shrink-0">
                {change.timestamp}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
