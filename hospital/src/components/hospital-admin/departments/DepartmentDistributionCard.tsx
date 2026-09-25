'use client';

import React from 'react';
import { Network } from 'lucide-react';
import { DepartmentDistributionItem } from '../../../features/hospital-admin/departmentTypes';

interface DepartmentDistributionCardProps {
  distribution?: DepartmentDistributionItem[];
  totalDepartments?: number;
}

const defaultDistribution: DepartmentDistributionItem[] = [
  {
    name: 'Clinical Departments',
    count: 8,
    percentage: 57,
    color: '#0066FF',
  },
  {
    name: 'Support Services',
    count: 3,
    percentage: 21,
    color: '#00C5FF',
  },
  {
    name: 'Administrative',
    count: 2,
    percentage: 14,
    color: '#8B5CF6',
  },
  {
    name: 'Facilities & Operations',
    count: 1,
    percentage: 7,
    color: '#F59E0B',
  },
];

export const DepartmentDistributionCard: React.FC<
  DepartmentDistributionCardProps
> = ({ distribution = defaultDistribution, totalDepartments = 14 }) => {
  // SVG Donut calculation
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  let cumulativeOffset = 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
            <Network className="w-4 h-4" strokeWidth={2.4} />
          </div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Department Distribution
          </h3>
        </div>
        <button
          type="button"
          className="text-xs font-semibold text-[#0066FF] hover:underline cursor-pointer"
        >
          View Details →
        </button>
      </div>

      {/* Donut Chart + Legend Row */}
      <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6">
        {/* SVG Donut */}
        <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {distribution.map((item, idx) => {
              const dashLength = (item.percentage / 100) * circumference;
              const currentOffset = cumulativeOffset;
              cumulativeOffset += dashLength;

              return (
                <circle
                  key={idx}
                  cx="50"
                  cy="50"
                  r={radius}
                  stroke={item.color}
                  strokeWidth="11"
                  strokeDasharray={`${dashLength} ${circumference - dashLength}`}
                  strokeDashoffset={-currentOffset}
                  fill="transparent"
                  className="transition-all duration-700 ease-out"
                />
              );
            })}
          </svg>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-xl font-bold text-slate-900 tracking-tight leading-none">
              {totalDepartments}
            </span>
            <span className="text-[10.5px] font-medium text-slate-400 mt-0.5">
              Departments
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-2 w-full">
          {distribution.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between text-xs py-0.5"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate-600 truncate">{item.name}</span>
              </div>
              <span className="font-semibold text-slate-800 shrink-0 text-[11.5px] pl-2">
                {item.count} ({item.percentage}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
