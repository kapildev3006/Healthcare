'use client';

import React from 'react';
import { Clock } from 'lucide-react';
import { ScheduleDayItem } from '@/features/hospital-admin/doctorProfileTypes';

interface ScheduleAvailabilityCardProps {
  schedule: ScheduleDayItem[];
  onManageSchedule?: () => void;
}

export const ScheduleAvailabilityCard: React.FC<ScheduleAvailabilityCardProps> = ({
  schedule,
  onManageSchedule,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">
              Schedule & Availability
            </h3>
          </div>

          <button
            type="button"
            onClick={onManageSchedule}
            className="text-xs font-semibold text-[#0066FF] hover:underline cursor-pointer"
          >
            Manage Schedule
          </button>
        </div>

        {/* Schedule Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 font-semibold border-b border-slate-100/80">
                <th className="pb-1.5 font-medium">Day</th>
                <th className="pb-1.5 font-medium">Shift Time</th>
                <th className="pb-1.5 font-medium text-right">Availability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {schedule.map((item) => (
                <tr key={item.day} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-1.5 font-medium text-slate-700">
                    {item.day}
                  </td>
                  <td className="py-1.5 text-slate-500 font-medium whitespace-nowrap">
                    {item.shiftTime}
                  </td>
                  <td className="py-1.5 text-right whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          item.statusColor === 'green'
                            ? 'bg-emerald-500'
                            : item.statusColor === 'amber'
                            ? 'bg-amber-500'
                            : 'bg-rose-500'
                        }`}
                      />
                      <span
                        className={
                          item.statusColor === 'green'
                            ? 'text-emerald-600'
                            : item.statusColor === 'amber'
                            ? 'text-amber-600'
                            : 'text-rose-600'
                        }
                      >
                        {item.availability}
                      </span>
                    </span>
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
