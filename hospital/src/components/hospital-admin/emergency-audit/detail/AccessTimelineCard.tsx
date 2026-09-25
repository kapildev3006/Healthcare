'use client';

import React from 'react';
import { Clock } from 'lucide-react';
import { AccessTimelineEvent } from '@/features/hospital-admin/emergencyAuditDetailTypes';

interface AccessTimelineCardProps {
  timeline: AccessTimelineEvent[];
}

export const AccessTimelineCard: React.FC<AccessTimelineCardProps> = ({ timeline }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-5 pb-2.5 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 tracking-tight">
            Access Timeline
          </h3>
        </div>

        {/* Timeline List */}
        <div className="relative pl-1 pr-1 space-y-5">
          {timeline.map((item, idx) => {
            const isLast = idx === timeline.length - 1;
            return (
              <div key={item.id} className="relative flex items-start gap-4">
                {/* Connecting Line */}
                {!isLast && (
                  <div
                    className="absolute left-[72px] top-[14px] bottom-[-20px] w-[2px] bg-blue-100"
                    aria-hidden="true"
                  />
                )}

                {/* Timestamp */}
                <div className="w-14 text-right shrink-0">
                  <span className="text-xs font-semibold text-slate-700 font-mono">
                    {item.time}
                  </span>
                </div>

                {/* Node Bullet */}
                <div className="relative z-10 mt-1">
                  <div
                    className={`w-3.5 h-3.5 rounded-full ring-4 ring-white shrink-0 flex items-center justify-center ${
                      item.isTerminal
                        ? 'bg-slate-400'
                        : 'bg-[#0066FF]'
                    }`}
                  />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1 pt-0.5">
                  <p className="text-xs font-bold text-slate-900 leading-tight">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
