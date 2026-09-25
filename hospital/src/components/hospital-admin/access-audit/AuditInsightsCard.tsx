'use client';

import React from 'react';
import { BarChart3, ArrowRight } from 'lucide-react';
import { AuditInsightItem } from '@/features/hospital-admin/accessAuditTypes';

interface AuditInsightsCardProps {
  insights: AuditInsightItem[];
  onViewDetails?: () => void;
}

export const AuditInsightsCard: React.FC<AuditInsightsCardProps> = ({
  insights,
  onViewDetails,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center">
              <BarChart3 className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">
              Audit Insights
            </h3>
          </div>

          <button
            type="button"
            onClick={onViewDetails}
            className="text-xs font-semibold text-[#0066FF] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Insights Rows */}
        <div className="space-y-4 pt-1">
          {insights.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between text-xs py-1 border-b border-slate-50 last:border-0"
            >
              <span className="font-medium text-slate-600">{item.label}</span>
              <span className="font-semibold text-slate-800 text-center flex-1 px-2 truncate">
                {item.value}
              </span>
              <span
                className={`font-bold text-right shrink-0 ${
                  item.trend
                    ? 'text-rose-500 font-bold'
                    : 'text-slate-900'
                }`}
              >
                {item.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
