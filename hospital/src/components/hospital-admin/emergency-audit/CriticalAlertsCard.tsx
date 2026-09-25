'use client';

import React from 'react';
import { AlertTriangle, ArrowRight, ChevronRight } from 'lucide-react';
import { CriticalAlertItem } from '@/features/hospital-admin/emergencyAuditTypes';

interface CriticalAlertsCardProps {
  alerts: CriticalAlertItem[];
  onViewAll?: () => void;
  onSelectAlert?: (alert: CriticalAlertItem) => void;
}

export const CriticalAlertsCard: React.FC<CriticalAlertsCardProps> = ({
  alerts,
  onViewAll,
  onSelectAlert,
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
            <h3 className="font-bold text-sm text-slate-900 tracking-tight">
              Critical Alerts Requiring Follow-up
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

        {/* Alerts List */}
        <div className="space-y-3.5 pt-1">
          {alerts.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectAlert?.(item)}
              className="flex items-center justify-between gap-2 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
            >
              {/* Left: User & Subtitle */}
              <div className="flex items-start gap-2.5 min-w-0">
                <span className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                <div className="min-w-0">
                  <p className="font-bold text-xs text-slate-900 group-hover:text-rose-600 transition-colors truncate">
                    {item.user}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                    {item.patientRecord}
                  </p>
                  <p className="text-[10.5px] text-slate-400">
                    {item.timestamp}
                  </p>
                </div>
              </div>

              {/* Right: Severity Badge & Alert Tag */}
              <div className="flex items-center gap-2 shrink-0">
                {item.severity === 'High' ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FEF2F2] text-[#EF4444] border border-[#FECACA]">
                    High
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]">
                    Medium
                  </span>
                )}

                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all group-hover:scale-102 ${
                    item.alertColor === 'amber'
                      ? 'bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]'
                      : 'bg-[#FEF2F2] text-[#EF4444] border border-[#FECACA]'
                  }`}
                >
                  <span>{item.alertType}</span>
                  <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
