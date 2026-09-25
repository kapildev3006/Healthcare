'use client';

import React from 'react';
import { Building2, Users, UserPlus, BarChart3 } from 'lucide-react';
import { DepartmentStats } from '../../../features/hospital-admin/departmentTypes';

interface DepartmentStatsRowProps {
  stats: DepartmentStats;
}

export const DepartmentStatsRow: React.FC<DepartmentStatsRowProps> = ({
  stats,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* 1. Total Departments */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between hover:border-blue-200 transition-all">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#EFF6FF] text-[#0066FF] flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5" strokeWidth={2.2} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[12px] font-medium text-slate-500">
              Total Departments
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">
                {stats.totalDepartments}
              </span>
              <span className="text-[12px] font-semibold text-[#16A34A] flex items-center">
                {stats.totalTrend}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
          Across clinical and support
        </div>
      </div>

      {/* 2. Active Department Heads */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between hover:border-blue-200 transition-all">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#EFF6FF] text-[#0066FF] flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" strokeWidth={2.2} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[12px] font-medium text-slate-500">
              Active Department Heads
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">
                {stats.activeHeads}
              </span>
              <span className="text-[12px] font-semibold text-[#16A34A] flex items-center">
                {stats.activeHeadsTrend}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
          Out of 14 departments
        </div>
      </div>

      {/* 3. Open Roles */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between hover:border-blue-200 transition-all">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#EFF6FF] text-[#0066FF] flex items-center justify-center shrink-0">
            <UserPlus className="w-5 h-5" strokeWidth={2.2} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[12px] font-medium text-slate-500">
              Open Roles
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">
                {stats.openRoles}
              </span>
              <span className="text-[12px] font-semibold text-[#EF4444] flex items-center">
                {stats.openRolesTrend}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
          Staff positions to fill
        </div>
      </div>

      {/* 4. Department Performance */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between hover:border-blue-200 transition-all">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#EFF6FF] text-[#0066FF] flex items-center justify-center shrink-0">
            <BarChart3 className="w-5 h-5" strokeWidth={2.2} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[12px] font-medium text-slate-500">
              Department Performance
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">
                {stats.performanceScore}%
              </span>
              <span className="text-[12px] font-semibold text-[#16A34A] flex items-center">
                {stats.performanceTrend}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
          Average operational score
        </div>
      </div>
    </div>
  );
};
