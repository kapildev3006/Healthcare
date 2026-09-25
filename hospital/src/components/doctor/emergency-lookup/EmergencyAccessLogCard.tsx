'use client';

import React from 'react';
import { UserCheck, Shield, Clock } from 'lucide-react';
import { EmergencyAccessLogItem } from '@/features/doctor/emergencyLookupTypes';

interface EmergencyAccessLogCardProps {
  logs: EmergencyAccessLogItem[];
  onViewAll?: () => void;
}

export function EmergencyAccessLogCard({
  logs,
  onViewAll,
}: EmergencyAccessLogCardProps) {
  const getBadgeStyle = (type: EmergencyAccessLogItem['accessType']) => {
    switch (type) {
      case 'Current':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200/80 font-bold';
      case 'Emergency':
        return 'bg-slate-100 text-slate-700 border border-slate-200/80 font-medium';
      case 'Consultation':
        return 'bg-sky-50 text-sky-700 border border-sky-200/80 font-medium';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-3.5">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
            <UserCheck className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Emergency Access Log</h3>
        </div>
        <button
          onClick={onViewAll}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          View All
        </button>
      </div>

      {/* Log Items */}
      <div className="space-y-3">
        {logs.map((log) => (
          <div
            key={log.id}
            className="flex items-center justify-between gap-2 text-xs"
          >
            <div className="flex items-start gap-2.5 min-w-0 pr-1">
              <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0 mt-0.5">
                <Shield className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-slate-900 truncate">
                  {log.accessor}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {log.timestamp}
                </p>
              </div>
            </div>

            <span
              className={`px-2 py-0.5 rounded-full text-[10px] shrink-0 ${getBadgeStyle(
                log.accessType
              )}`}
            >
              {log.accessType}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
