'use client';

import React from 'react';
import { BarChart3, ArrowRight } from 'lucide-react';
import { DepartmentMetric } from '../../features/hospital-admin/types';

interface DepartmentOverviewCardProps {
  departments: DepartmentMetric[];
  onViewAll?: () => void;
}

export const DepartmentOverviewCard: React.FC<DepartmentOverviewCardProps> = ({
  departments,
  onViewAll,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#1877F2]" strokeWidth={2.2} />
            <h3 className="font-bold text-[14.5px] text-slate-900">
              Department Overview
            </h3>
          </div>
          <button
            type="button"
            onClick={onViewAll}
            className="flex items-center gap-1 text-[12px] font-semibold text-[#1877F2] hover:text-blue-700 transition-colors cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Department Progress List */}
        <div className="mt-4 space-y-3.5">
          {departments.map((dept) => {
            const percentage = Math.round((dept.count / dept.capacity) * 100);

            return (
              <div key={dept.id} className="flex items-center gap-3">
                <span className="text-[12.5px] font-medium text-slate-700 w-28 shrink-0 truncate">
                  {dept.name}
                </span>

                {/* Progress Bar Container */}
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#4895EF] rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                {/* Count */}
                <span className="text-[12.5px] font-bold text-slate-800 w-6 text-right shrink-0">
                  {dept.count}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
