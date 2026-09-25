'use client';

import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { SecurityEventItem } from '@/features/hospital-admin/securitySettingsTypes';

interface RecentSecurityEventsCardProps {
  events: SecurityEventItem[];
  onViewAll?: () => void;
}

export const RecentSecurityEventsCard: React.FC<RecentSecurityEventsCardProps> = ({
  events,
  onViewAll,
}) => {
  const getEventTextColor = (color: SecurityEventItem['eventColor']) => {
    switch (color) {
      case 'red':
        return 'text-[#EF4444] font-semibold';
      case 'green':
        return 'text-[#16A34A] font-semibold';
      case 'blue':
        return 'text-[#0066FF] font-semibold';
      default:
        return 'text-slate-700';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 tracking-tight">
              Recent Security Events
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

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400">
                <th className="pb-2 font-medium">User</th>
                <th className="pb-2 font-medium">Event</th>
                <th className="pb-2 font-medium text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {events.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-2 font-semibold text-slate-900 whitespace-nowrap text-[11.5px]">
                    {item.user}
                  </td>
                  <td className={`py-2 whitespace-nowrap text-[11.5px] ${getEventTextColor(item.eventColor)}`}>
                    {item.event}
                  </td>
                  <td className="py-2 text-right text-slate-400 font-mono text-[11px] whitespace-nowrap">
                    {item.timestamp}
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
