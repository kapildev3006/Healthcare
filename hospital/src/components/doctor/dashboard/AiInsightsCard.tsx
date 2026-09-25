'use client';

import React from 'react';
import { Brain, AlertTriangle, FileCheck, ChevronRight } from 'lucide-react';
import { AiInsightItem } from '@/features/doctor/doctorDashboardTypes';

interface AiInsightsCardProps {
  insights: AiInsightItem[];
  onSelectInsight: (insight: AiInsightItem) => void;
  onViewAll?: () => void;
}

export function AiInsightsCard({
  insights,
  onSelectInsight,
  onViewAll,
}: AiInsightsCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Brain className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-slate-900">AI Insights</h2>
        </div>
        <button
          onClick={onViewAll}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          View All
        </button>
      </div>

      {/* Insights List */}
      <div className="space-y-3 pt-3">
        {insights.map((insight) => {
          let IconComponent = Brain;
          let iconContainerClass = 'bg-blue-100 text-blue-600';

          if (insight.iconType === 'alert') {
            IconComponent = AlertTriangle;
            iconContainerClass = 'bg-red-100 text-red-600';
          } else if (insight.iconType === 'check') {
            IconComponent = FileCheck;
            iconContainerClass = 'bg-emerald-100 text-emerald-600';
          }

          return (
            <div
              key={insight.id}
              onClick={() => onSelectInsight(insight)}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${iconContainerClass}`}
                >
                  <IconComponent className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                    {insight.title}
                  </p>
                  <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                    {insight.subtitle}
                  </p>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-0.5 shrink-0" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
