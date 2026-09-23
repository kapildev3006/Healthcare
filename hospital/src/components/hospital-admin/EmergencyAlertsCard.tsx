'use client';

import React from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { EmergencyAlertItem } from '../../features/hospital-admin/types';

interface EmergencyAlertsCardProps {
  alerts: EmergencyAlertItem[];
  onViewAll?: () => void;
  onSelectAlert?: (alert: EmergencyAlertItem) => void;
}

export const EmergencyAlertsCard: React.FC<EmergencyAlertsCardProps> = ({
  alerts,
  onViewAll,
  onSelectAlert,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-[#EF4444]" strokeWidth={2.2} />
            <h3 className="font-bold text-[14.5px] text-slate-900">
              Emergency Access Alerts
            </h3>
          </div>
          <button
            type="button"
            onClick={onViewAll}
            className="flex items-center gap-1 text-[12px] font-semibold text-[#1877F2] hover:text-blue-700 transition-colors cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Alerts List */}
        <div className="mt-3.5 space-y-3.5">
          {alerts.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectAlert?.(item)}
              className="flex items-start gap-3 group cursor-pointer hover:bg-slate-50/60 p-1.5 -mx-1.5 rounded-xl transition-colors"
            >
              {/* Red Indicator Dot */}
              <div className="w-2 h-2 rounded-full bg-[#EF4444] mt-1.5 shrink-0" />

              {/* Alert Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[13px] font-bold text-slate-900 truncate">
                    {item.doctorName}
                  </span>
                  <span className="shrink-0 px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-[#FEECEC] text-[#E53E3E]">
                    {item.status}
                  </span>
                </div>
                <p className="text-[11.5px] text-slate-500 mt-0.5">
                  {item.patientRecord}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {item.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
