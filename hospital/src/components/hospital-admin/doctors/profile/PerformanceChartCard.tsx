'use client';

import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import { PerformanceOverview } from '@/features/hospital-admin/doctorProfileTypes';

interface PerformanceChartCardProps {
  performance: PerformanceOverview;
  onViewDetails?: () => void;
}

export const PerformanceChartCard: React.FC<PerformanceChartCardProps> = ({
  performance,
  onViewDetails,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // SVG Chart Calculations
  // Width 320, Height 70
  // Values range from roughly 80 to 160
  const width = 320;
  const height = 65;
  const data = performance.chartData;
  const minVal = Math.min(...data.map((d) => d.visits)) * 0.9;
  const maxVal = Math.max(...data.map((d) => d.visits)) * 1.05;

  const getCoordinates = (index: number, val: number) => {
    const x = (index / (data.length - 1)) * (width - 24) + 12;
    const y = height - 12 - ((val - minVal) / (maxVal - minVal)) * (height - 24);
    return { x, y };
  };

  const points = data.map((d, i) => getCoordinates(i, d.visits));

  // Build smooth bezier SVG path
  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const cpX = (p0.x + p1.x) / 2;
    pathD += ` C ${cpX} ${p0.y}, ${cpX} ${p1.y}, ${p1.x} ${p1.y}`;
  }

  // Area path for gradient fill
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center">
              <BarChart3 className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">
              Performance (Last 6 Months)
            </h3>
          </div>

          <button
            type="button"
            onClick={onViewDetails}
            className="text-xs font-semibold text-[#0066FF] hover:underline cursor-pointer"
          >
            View Details
          </button>
        </div>

        {/* Metrics Overview */}
        <div className="space-y-1.5 text-xs mb-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">Total Patient Visits</span>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-900">
                {performance.totalPatientVisits}
              </span>
              <span className="text-emerald-600 font-semibold text-[11px]">
                {performance.visitsTrend}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">New Patients</span>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-900">
                {performance.newPatients}
              </span>
              <span className="text-emerald-600 font-semibold text-[11px]">
                {performance.newPatientsTrend}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">Follow-up Visits</span>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-900">
                {performance.followUpVisits}
              </span>
              <span className="text-emerald-600 font-semibold text-[11px]">
                {performance.followUpTrend}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">Referrals Made</span>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-900">
                {performance.referralsMade}
              </span>
              <span className="text-emerald-600 font-semibold text-[11px]">
                {performance.referralsTrend}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">Patient Satisfaction</span>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-900">
                {performance.patientSatisfaction}
              </span>
              <span className="text-emerald-600 font-semibold text-[11px]">
                {performance.satisfactionTrend}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Smooth Line Chart */}
      <div className="pt-2 border-t border-slate-100">
        <div className="relative w-full h-[70px]">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="performanceGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0066FF" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#0066FF" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Gradient Area */}
            <path d={areaD} fill="url(#performanceGrad)" />

            {/* Smooth Stroke */}
            <path
              d={pathD}
              fill="none"
              stroke="#0066FF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data Points */}
            {points.map((pt, i) => (
              <circle
                key={i}
                cx={pt.x}
                cy={pt.y}
                r={hoveredIndex === i ? 5 : 3}
                fill="#FFFFFF"
                stroke="#0066FF"
                strokeWidth={hoveredIndex === i ? 3 : 2}
                className="cursor-pointer transition-all"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            ))}
          </svg>

          {/* Hover Tooltip */}
          {hoveredIndex !== null && (
            <div
              className="absolute -top-6 transform -translate-x-1/2 bg-slate-900 text-white text-[10px] font-semibold py-0.5 px-2 rounded shadow-md pointer-events-none transition-all"
              style={{
                left: `${(hoveredIndex / (data.length - 1)) * 100}%`,
              }}
            >
              {data[hoveredIndex].visits} visits
            </div>
          )}
        </div>

        {/* Month labels */}
        <div className="flex justify-between items-center text-[10px] font-medium text-slate-400 mt-1 px-1">
          {data.map((d) => (
            <span key={d.month}>{d.month}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
