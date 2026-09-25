'use client';

import React from 'react';
import Image from 'next/image';
import { Calendar } from 'lucide-react';
import { UpcomingFollowupItem } from '@/features/doctor/myPatientsTypes';

interface UpcomingFollowupsCardProps {
  followups: UpcomingFollowupItem[];
  onViewAll?: () => void;
  onSelectFollowup?: (item: UpcomingFollowupItem) => void;
}

export function UpcomingFollowupsCard({
  followups,
  onViewAll,
  onSelectFollowup,
}: UpcomingFollowupsCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-1 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-bold text-slate-900">
            Upcoming Follow-ups
          </h3>
        </div>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
        >
          View All
        </button>
      </div>

      {/* Follow-up List */}
      <div className="space-y-3">
        {followups.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectFollowup?.(item)}
            className="flex items-center justify-between gap-3 p-1.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
          >
            {/* Avatar & Details */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                {item.avatarUrl ? (
                  <Image
                    src={item.avatarUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-bold text-xs text-blue-600 bg-blue-50">
                    {item.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                  {item.name}
                </p>
                <p className="text-[11px] text-slate-500 truncate font-normal">
                  {item.reason}
                </p>
              </div>
            </div>

            {/* Date */}
            <div className="text-right shrink-0">
              <span className="text-[11px] font-semibold text-slate-600">
                {item.dueDate}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
