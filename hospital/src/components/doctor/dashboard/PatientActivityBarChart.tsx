'use client';

import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { DailyActivityMetric } from '@/features/doctor/doctorDashboardTypes';

interface PatientActivityBarChartProps {
  data: DailyActivityMetric[];
  totalPatients?: number;
  trendText?: string;
}

export function PatientActivityBarChart({
  data,
  totalPatients = 168,
  trendText = '12%',
}: PatientActivityBarChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const maxY = 40;
  const chartHeight = 160;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-start justify-between pb-3.5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Patient Activity{' '}
              <span className="text-xs font-normal text-slate-400">
                (Last 7 Days)
              </span>
            </h2>
          </div>
        </div>

        {/* Top Right Summary */}
        <div className="text-right">
          <span className="text-[11px] font-medium text-slate-400 block">
            Total Patients
          </span>
          <div className="flex items-center justify-end gap-1.5">
            <span className="text-base font-extrabold text-slate-900 leading-tight">
              {totalPatients}
            </span>
            <span className="text-xs font-semibold text-emerald-600">
              ↑ {trendText}
            </span>
          </div>
        </div>
      </div>

      {/* Bar Chart Container */}
      <div className="pt-4 relative">
        {/* Y Axis Grid lines */}
        <div className="relative h-[160px] flex flex-col justify-between text-[10px] text-slate-400 font-mono select-none">
          {[40, 30, 20, 10, 0].map((val) => (
            <div key={val} className="flex items-center w-full">
              <span className="w-6 text-right pr-2 shrink-0">{val}</span>
              <div className="flex-1 h-px bg-slate-100" />
            </div>
          ))}

          {/* Bars Overlay */}
          <div className="absolute left-7 right-2 inset-y-0 flex items-end justify-between px-2 pb-0.5">
            {data.map((item, idx) => {
              const heightPercent = (item.patients / maxY) * 100;
              const isHovered = hoveredIndex === idx;

              return (
                <div
                  key={item.date}
                  className="relative flex-1 flex flex-col items-center group h-full justify-end px-1"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Tooltip */}
                  {isHovered && (
                    <div className="absolute -top-9 z-20 px-2 py-1 bg-slate-900 text-white text-[11px] font-bold rounded-md shadow-md pointer-events-none whitespace-nowrap animate-in fade-in zoom-in-95 duration-100">
                      {item.patients} patients
                    </div>
                  )}

                  {/* Bar */}
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full max-w-[28px] rounded-t-md transition-all duration-200 cursor-pointer ${
                      isHovered
                        ? 'bg-blue-600 shadow-md shadow-blue-500/30'
                        : 'bg-sky-400/90 hover:bg-blue-500'
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* X Axis Labels */}
        <div className="flex justify-between pl-7 pr-2 mt-2 text-[11px] font-semibold text-slate-500">
          {data.map((item) => (
            <span key={item.date} className="flex-1 text-center truncate">
              {item.date}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
