'use client';

import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { DepartmentDistributionItem } from '@/features/doctor/doctorDashboardTypes';

interface PatientDistributionDonutChartProps {
  distribution: DepartmentDistributionItem[];
  totalPatients?: number;
}

export function PatientDistributionDonutChart({
  distribution,
  totalPatients = 168,
}: PatientDistributionDonutChartProps) {
  const [hoveredDept, setHoveredDept] = useState<string | null>(null);

  // SVG Donut calculation
  const radius = 54;
  const strokeWidth = 18;
  const circumference = 2 * Math.PI * radius; // ~339.292

  // Cumulative offsets
  let accumulatedPercent = 0;
  const segments = distribution.map((item) => {
    const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
    accumulatedPercent += item.percentage;

    return {
      ...item,
      strokeDasharray,
      strokeDashoffset,
    };
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center gap-2 pb-3.5 border-b border-slate-100">
        <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <h2 className="text-sm font-bold text-slate-900">Patient Distribution</h2>
      </div>

      {/* Content: Donut + Legend */}
      <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* SVG Donut */}
        <div className="relative w-40 h-40 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 140 140">
            {/* Background track */}
            <circle
              cx="70"
              cy="70"
              r={radius}
              stroke="#f1f5f9"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Segments */}
            {segments.map((seg) => {
              const isHovered = hoveredDept === seg.department;
              return (
                <circle
                  key={seg.department}
                  cx="70"
                  cy="70"
                  r={radius}
                  stroke={seg.color}
                  strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                  strokeDasharray={seg.strokeDasharray}
                  strokeDashoffset={seg.strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-200 cursor-pointer"
                  onMouseEnter={() => setHoveredDept(seg.department)}
                  onMouseLeave={() => setHoveredDept(null)}
                />
              );
            })}
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight leading-none">
              {hoveredDept
                ? distribution.find((d) => d.department === hoveredDept)?.patientsCount || totalPatients
                : totalPatients}
            </span>
            <span className="text-[11px] font-semibold text-slate-500 mt-1">
              {hoveredDept ? hoveredDept : 'Total Patients'}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 w-full space-y-2.5">
          {distribution.map((item) => (
            <div
              key={item.department}
              onMouseEnter={() => setHoveredDept(item.department)}
              onMouseLeave={() => setHoveredDept(null)}
              className={`flex items-center justify-between text-xs py-1 px-2 rounded-lg transition-colors cursor-pointer ${
                hoveredDept === item.department
                  ? 'bg-slate-100/80 font-bold'
                  : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate-700 font-medium">
                  {item.department}
                </span>
              </div>
              <span className="font-bold text-slate-900 ml-2">
                {item.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
