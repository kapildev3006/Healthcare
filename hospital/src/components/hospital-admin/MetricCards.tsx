'use client';

import React from 'react';
import {
  Stethoscope,
  FileCheck2,
  Building2,
  Users,
  Key,
  AlertTriangle,
} from 'lucide-react';
import { MetricStat } from '../../features/hospital-admin/types';

interface MetricCardsProps {
  stats: MetricStat[];
}

export const MetricCards: React.FC<MetricCardsProps> = ({ stats }) => {
  const getIcon = (type: MetricStat['iconType']) => {
    switch (type) {
      case 'stethoscope':
        return (
          <div className="w-11 h-11 rounded-2xl bg-[#EAF2FD] text-[#1877F2] flex items-center justify-center shrink-0">
            <Stethoscope className="w-5 h-5" strokeWidth={2.2} />
          </div>
        );
      case 'pending':
        return (
          <div className="w-11 h-11 rounded-2xl bg-[#FEECEC] text-[#EF4444] flex items-center justify-center shrink-0">
            <FileCheck2 className="w-5 h-5" strokeWidth={2.2} />
          </div>
        );
      case 'department':
        return (
          <div className="w-11 h-11 rounded-2xl bg-[#EAF2FD] text-[#1877F2] flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5" strokeWidth={2.2} />
          </div>
        );
      case 'staff':
        return (
          <div className="w-11 h-11 rounded-2xl bg-[#EAF2FD] text-[#1877F2] flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" strokeWidth={2.2} />
          </div>
        );
      case 'access':
        return (
          <div className="w-11 h-11 rounded-2xl bg-[#EAF2FD] text-[#1877F2] flex items-center justify-center shrink-0">
            <Key className="w-5 h-5" strokeWidth={2.2} />
          </div>
        );
      case 'emergency':
        return (
          <div className="w-11 h-11 rounded-2xl bg-[#FEECEC] text-[#EF4444] flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" strokeWidth={2.2} />
          </div>
        );
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="bg-white rounded-2xl border border-slate-200/80 p-4 flex flex-col justify-between shadow-xs hover:border-blue-200 transition-all duration-200"
        >
          {/* Top row: Icon and Title */}
          <div className="flex items-start gap-3">
            {getIcon(stat.iconType)}
            <div className="flex flex-col min-w-0">
              <span className="text-[12px] font-medium text-slate-500 truncate">
                {stat.title}
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-bold text-slate-900 tracking-tight">
                  {stat.value}
                </span>
                {stat.trend && (
                  <span
                    className={`text-[12px] font-semibold flex items-center ${
                      stat.trendColor === 'green'
                        ? 'text-[#16A34A]'
                        : stat.trendColor === 'red'
                        ? 'text-[#EF4444]'
                        : 'text-slate-400'
                    }`}
                  >
                    {stat.trend}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Bottom row: Subtext */}
          <div className="mt-3 pt-2 border-t border-slate-100">
            <span className="text-[11.5px] text-slate-400 font-medium">
              {stat.subtext}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
