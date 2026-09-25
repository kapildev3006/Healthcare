'use client';

import React from 'react';
import {
  X,
  AlertTriangle,
  ChevronRight,
  Clock,
  User,
  FileText,
  CheckCircle2,
  ShieldAlert,
} from 'lucide-react';
import { CriticalAlertItem } from '@/features/hospital-admin/emergencyAuditTypes';

interface CriticalAlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: CriticalAlertItem[];
  onSelectAlert?: (alert: CriticalAlertItem) => void;
  onResolveAlert?: (alertId: string) => void;
}

export const CriticalAlertsModal: React.FC<CriticalAlertsModalProps> = ({
  isOpen,
  onClose,
  alerts,
  onSelectAlert,
  onResolveAlert,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-rose-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-slate-900">
                  Critical Alerts Requiring Follow-up
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700">
                  {alerts.length} Pending
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Break-glass access events requiring administrator investigation & sign-off
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-5 overflow-y-auto space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex items-center justify-between gap-3"
            >
              <div className="flex items-start gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] shrink-0 mt-1.5" />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-xs">{alert.user}</span>
                    <span
                      className={`px-1.5 py-0.2 rounded text-[10px] font-semibold ${
                        alert.severity === 'High'
                          ? 'bg-[#FEF2F2] text-[#EF4444] border border-[#FECACA]'
                          : 'bg-[#FFFBEB] text-[#F59E0B] border border-[#FDE68A]'
                      }`}
                    >
                      {alert.severity}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500">
                    Target: <span className="font-medium text-slate-700">{alert.patientRecord}</span>
                  </p>

                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>{alert.timestamp}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    if (onSelectAlert) onSelectAlert(alert);
                  }}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                    alert.alertColor === 'amber'
                      ? 'bg-[#FFFBEB] text-[#D97706] hover:bg-amber-100 border border-[#FDE68A]'
                      : 'bg-[#FEF2F2] text-[#EF4444] hover:bg-rose-100 border border-[#FECACA]'
                  }`}
                >
                  {alert.alertType}
                  <ChevronRight className="w-3 h-3" />
                </button>

                {onResolveAlert && (
                  <button
                    type="button"
                    onClick={() => onResolveAlert(alert.id)}
                    className="p-1.5 rounded-md hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 transition-colors"
                    title="Mark resolved"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            All actions logged in HIPAA / NABH incident log.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-slate-300 text-slate-700 bg-white hover:bg-slate-100 font-medium text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
