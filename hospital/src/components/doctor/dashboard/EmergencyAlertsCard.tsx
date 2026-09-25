'use client';

import React from 'react';
import { Siren, AlertTriangle } from 'lucide-react';
import { EmergencyAlertItem } from '@/features/doctor/doctorDashboardTypes';

interface EmergencyAlertsCardProps {
  alerts: EmergencyAlertItem[];
  onSelectAlert: (alert: EmergencyAlertItem) => void;
  onViewAll?: () => void;
}

export function EmergencyAlertsCard({
  alerts,
  onSelectAlert,
  onViewAll,
}: EmergencyAlertsCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
            <Siren className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-slate-900">Emergency Alerts</h2>
        </div>
        <button
          onClick={onViewAll}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          View All
        </button>
      </div>

      {/* Alerts List */}
      <div className="space-y-3 pt-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-center justify-between p-3 rounded-xl bg-red-50/40 hover:bg-red-50/70 border border-red-100/60 transition-colors group cursor-pointer"
            onClick={() => onSelectAlert(alert)}
          >
            <div className="flex items-center gap-3 min-w-0 pr-2">
              <div className="w-8 h-8 rounded-full bg-red-100/80 text-red-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-bold text-slate-900 truncate group-hover:text-red-600 transition-colors">
                  {alert.title}
                </p>
                <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                  {alert.subtitle}
                </p>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectAlert(alert);
              }}
              className="px-3 py-1 rounded-lg text-xs font-semibold text-red-600 bg-white hover:bg-red-50 border border-red-200/80 shadow-2xs shrink-0 transition-colors"
            >
              {alert.actionType}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
