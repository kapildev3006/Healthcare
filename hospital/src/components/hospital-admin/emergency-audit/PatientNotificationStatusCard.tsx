'use client';

import React from 'react';
import { Users, ArrowRight, Info } from 'lucide-react';
import { PatientNotificationBreakdown } from '@/features/hospital-admin/emergencyAuditTypes';

interface PatientNotificationStatusCardProps {
  data: PatientNotificationBreakdown;
  onViewAll?: () => void;
}

export const PatientNotificationStatusCard: React.FC<PatientNotificationStatusCardProps> = ({
  data,
  onViewAll,
}) => {
  // SVG Donut calculation
  const size = 110;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Compute strokeDasharray and strokeDashoffset for slices:
  // Green: 61%, Amber: 22%, Red: 6%, Slate: 11%
  let accumulatedPercent = 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 tracking-tight">
              Patient Notification Status
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

        {/* Center: Donut Chart & Legend */}
        <div className="flex items-center justify-between gap-4 py-2">
          {/* Donut Chart with Center Text */}
          <div className="relative flex items-center justify-center shrink-0">
            <svg
              width={size}
              height={size}
              className="transform -rotate-90"
              viewBox={`0 0 ${size} ${size}`}
            >
              {/* Background circle */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="#F1F5F9"
                strokeWidth={strokeWidth}
              />
              {/* Slices */}
              {data.items.map((item) => {
                const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
                const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
                accumulatedPercent += item.percentage;

                return (
                  <circle
                    key={item.status}
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={item.color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                );
              })}
            </svg>

            {/* Center label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <span className="text-xl font-bold text-slate-900 leading-none">
                {data.totalEvents}
              </span>
              <span className="text-[10px] text-slate-400 font-medium mt-0.5">
                Total Events
              </span>
            </div>
          </div>

          {/* Legend Rows */}
          <div className="flex-1 space-y-2 min-w-0">
            {data.items.map((item) => (
              <div
                key={item.status}
                className="flex items-center justify-between text-xs gap-1.5"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-slate-600 font-medium truncate text-[11.5px]">
                    {item.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-bold text-slate-800 text-xs">
                    {item.count}
                  </span>
                  <span className="font-semibold text-emerald-600 text-[11px] w-7 text-right">
                    {item.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Info Note Banner */}
      <div className="mt-4 p-3 rounded-xl bg-blue-50/60 border border-blue-100/80 flex items-start gap-2.5">
        <div className="w-4 h-4 rounded-full bg-blue-100 text-[#0066FF] flex items-center justify-center shrink-0 mt-0.5">
          <Info className="w-3 h-3" />
        </div>
        <p className="text-[11px] text-slate-600 leading-relaxed">
          Patients are automatically notified when their records are accessed under emergency circumstances, unless clinically exempt.
        </p>
      </div>
    </div>
  );
};
