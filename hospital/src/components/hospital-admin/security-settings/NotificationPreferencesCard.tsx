'use client';

import React from 'react';
import { Bell } from 'lucide-react';

interface NotificationPreferencesCardProps {
  securityAlerts: boolean;
  complianceUpdates: boolean;
  systemHealthAlerts: boolean;
  weeklySecurityReport: boolean;
  onChange: (field: string, value: any) => void;
}

export const NotificationPreferencesCard: React.FC<NotificationPreferencesCardProps> = ({
  securityAlerts,
  complianceUpdates,
  systemHealthAlerts,
  weeklySecurityReport,
  onChange,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-start gap-2.5 mb-4 pb-2 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0 mt-0.5">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 tracking-tight">
              Notification Preferences
            </h3>
            <p className="text-[11px] text-slate-500">
              Configure security and system notifications.
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-3.5 text-xs">
          {/* 1. Security Alerts */}
          <div className="flex items-center justify-between gap-3">
            <label className="font-medium text-slate-700 text-xs shrink-0">
              Security Alerts
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                role="switch"
                aria-checked={securityAlerts}
                onClick={() => onChange('securityAlerts', !securityAlerts)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  securityAlerts ? 'bg-[#0066FF]' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    securityAlerts ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className="text-[11px] text-slate-500 min-w-44">
                Failed logins, suspicious activity
              </span>
            </div>
          </div>

          {/* 2. Compliance Updates */}
          <div className="flex items-center justify-between gap-3">
            <label className="font-medium text-slate-700 text-xs shrink-0">
              Compliance Updates
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                role="switch"
                aria-checked={complianceUpdates}
                onClick={() => onChange('complianceUpdates', !complianceUpdates)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  complianceUpdates ? 'bg-[#0066FF]' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    complianceUpdates ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className="text-[11px] text-slate-500 min-w-44">
                Regulatory and policy changes
              </span>
            </div>
          </div>

          {/* 3. System Health Alerts */}
          <div className="flex items-center justify-between gap-3">
            <label className="font-medium text-slate-700 text-xs shrink-0">
              System Health Alerts
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                role="switch"
                aria-checked={systemHealthAlerts}
                onClick={() => onChange('systemHealthAlerts', !systemHealthAlerts)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  systemHealthAlerts ? 'bg-[#0066FF]' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    systemHealthAlerts ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className="text-[11px] text-slate-500 min-w-44">
                System downtime, performance
              </span>
            </div>
          </div>

          {/* 4. Weekly Security Report */}
          <div className="flex items-center justify-between gap-3">
            <label className="font-medium text-slate-700 text-xs shrink-0">
              Weekly Security Report
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                role="switch"
                aria-checked={weeklySecurityReport}
                onClick={() => onChange('weeklySecurityReport', !weeklySecurityReport)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  weeklySecurityReport ? 'bg-[#0066FF]' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    weeklySecurityReport ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className="text-[11px] text-slate-400 min-w-44">
                Send to admin email
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
