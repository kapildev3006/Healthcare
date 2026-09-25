'use client';

import React from 'react';
import { Clock } from 'lucide-react';

export interface ActivityItem {
  id: string;
  title: string;
  timestamp: string;
  author: string;
}

interface PreviousActivityCardProps {
  activities?: ActivityItem[];
}

const defaultActivities: ActivityItem[] = [
  {
    id: 'a-1',
    title: 'Application submitted',
    timestamp: 'Jun 11, 2025 10:24 AM',
    author: 'By Dr. Priya Sharma',
  },
  {
    id: 'a-2',
    title: 'Documents uploaded',
    timestamp: 'Jun 11, 2025 10:24 AM',
    author: 'By Dr. Priya Sharma',
  },
];

export const PreviousActivityCard: React.FC<PreviousActivityCardProps> = ({
  activities = defaultActivities,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
      {/* Header */}
      <div className="flex items-center gap-2 pb-3.5 mb-4 border-b border-slate-100">
        <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
          <Clock className="w-4 h-4" strokeWidth={2.4} />
        </div>
        <h3 className="text-sm font-bold text-slate-900 tracking-tight">
          Previous Activity
        </h3>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {activities.map((act, index) => (
          <div key={act.id} className="relative flex items-start gap-3">
            {/* Timeline Vertical Line */}
            {index < activities.length - 1 && (
              <span className="absolute left-[5px] top-3.5 bottom-0 w-[1.5px] bg-blue-100" />
            )}

            {/* Blue Bullet */}
            <div className="w-2.5 h-2.5 rounded-full bg-[#0066FF] mt-1 shrink-0 z-10 ring-4 ring-white" />

            {/* Content */}
            <div className="flex-1 min-w-0 text-xs">
              <p className="font-semibold text-slate-800">{act.title}</p>
              <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5 flex-wrap">
                <span>{act.timestamp}</span>
                <span>•</span>
                <span>{act.author}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
