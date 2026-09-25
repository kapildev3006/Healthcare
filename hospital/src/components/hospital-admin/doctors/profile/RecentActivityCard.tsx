'use client';

import React from 'react';
import { History, ArrowRight } from 'lucide-react';
import { DoctorActivityItem } from '@/features/hospital-admin/doctorProfileTypes';

interface RecentActivityCardProps {
  activities: DoctorActivityItem[];
  onViewAll?: () => void;
}

export const RecentActivityCard: React.FC<RecentActivityCardProps> = ({
  activities,
  onViewAll,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center">
              <History className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Recent Activity</h3>
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

        {/* Activity Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 font-semibold border-b border-slate-100/80">
                <th className="pb-1.5 font-medium">Date & Time</th>
                <th className="pb-1.5 font-medium">Activity</th>
                <th className="pb-1.5 font-medium text-right">Performed By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {activities.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-2 text-slate-500 whitespace-nowrap font-medium pr-2 text-[11px]">
                    {item.dateTime}
                  </td>
                  <td className="py-2 text-slate-700 whitespace-nowrap font-medium pr-2">
                    <span>{item.activity} </span>
                    <span className="text-[#0066FF] font-semibold">
                      {item.recordNumber}
                    </span>
                  </td>
                  <td className="py-2 text-right whitespace-nowrap text-slate-500 text-[11px]">
                    {item.performedBy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
