'use client';

import React from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { SuspiciousTrendItem } from '@/features/hospital-admin/accessAuditTypes';

interface SuspiciousTrendsCardProps {
  trends: SuspiciousTrendItem[];
  onViewAll?: () => void;
  onSelectTrend?: (trend: SuspiciousTrendItem) => void;
}

export const SuspiciousTrendsCard: React.FC<SuspiciousTrendsCardProps> = ({
  trends,
  onViewAll,
  onSelectTrend,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">
              Suspicious Access Trends
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

        {/* Trends List */}
        <div className="space-y-3 pt-1">
          {trends.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectTrend && onSelectTrend(item)}
              className="flex items-center justify-between gap-3 p-1.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
            >
              <div className="flex items-start gap-2.5 min-w-0">
                <span className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                <div className="min-w-0">
                  <p className="font-bold text-xs text-slate-800 group-hover:text-rose-600 transition-colors truncate">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0 text-right">
                <span className="text-xs font-bold text-slate-800">
                  {item.count}
                </span>
                <span className="text-xs font-bold text-rose-500">
                  {item.trend}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
