'use client';

import React from 'react';
import { BarChart3, ArrowRight } from 'lucide-react';
import { RoleDistributionItem } from '@/features/hospital-admin/staffRolesTypes';

interface RoleDistributionCardProps {
  distribution: RoleDistributionItem[];
  onViewAll?: () => void;
}

export const RoleDistributionCard: React.FC<RoleDistributionCardProps> = ({
  distribution,
  onViewAll,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center">
              <BarChart3 className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">
              Role Distribution
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

        {/* Distribution Bars */}
        <div className="space-y-4 pt-1">
          {distribution.map((item) => (
            <div key={item.id} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">{item.role}</span>
                <span className="font-bold text-slate-900">{item.count}</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-[#0066FF] h-full rounded-full transition-all duration-500"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
