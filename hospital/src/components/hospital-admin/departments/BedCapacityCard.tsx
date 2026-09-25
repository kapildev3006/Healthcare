'use client';

import React from 'react';
import { Bed } from 'lucide-react';
import { BedCapacityStats } from '../../../features/hospital-admin/departmentTypes';

interface BedCapacityCardProps {
  stats?: BedCapacityStats;
}

const defaultStats: BedCapacityStats = {
  totalBeds: 395,
  totalTrend: '↑ 12%',
  occupiedBeds: 312,
  occupiedPercentage: 79,
  availableBeds: 83,
  availablePercentage: 21,
};

export const BedCapacityCard: React.FC<BedCapacityCardProps> = ({
  stats = defaultStats,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
            <Bed className="w-4 h-4" strokeWidth={2.4} />
          </div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Bed Capacity Overview
          </h3>
        </div>
        <button
          type="button"
          className="text-xs font-semibold text-[#0066FF] hover:underline cursor-pointer"
        >
          View Details →
        </button>
      </div>

      {/* Content: Left Total + Right Bars */}
      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Left Total Info */}
        <div className="flex items-start gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0 mt-0.5">
            <Bed className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-medium text-slate-400 block">
              Total Bed Capacity
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">
                {stats.totalBeds}
              </span>
              <span className="text-xs font-semibold text-[#16A34A]">
                {stats.totalTrend}
              </span>
            </div>
            <span className="text-[11px] text-slate-400 mt-0.5 block">
              Across all departments
            </span>
          </div>
        </div>

        {/* Right Progress Bars */}
        <div className="flex-1 w-full space-y-3 pt-1">
          {/* Occupied Beds */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-500 font-medium">Occupied Beds</span>
              <span className="font-semibold text-slate-900">
                {stats.occupiedBeds}{' '}
                <span className="text-slate-400 font-normal">
                  {stats.occupiedPercentage}%
                </span>
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#0066FF] transition-all duration-700"
                style={{ width: `${stats.occupiedPercentage}%` }}
              />
            </div>
          </div>

          {/* Available Beds */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-500 font-medium">Available Beds</span>
              <span className="font-semibold text-slate-900">
                {stats.availableBeds}{' '}
                <span className="text-slate-400 font-normal">
                  {stats.availablePercentage}%
                </span>
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#38BDF8] transition-all duration-700"
                style={{ width: `${stats.availablePercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
