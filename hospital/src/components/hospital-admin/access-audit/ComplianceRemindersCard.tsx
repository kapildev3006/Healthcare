'use client';

import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  UserCheck,
  Clock,
} from 'lucide-react';
import { ComplianceReminderItem } from '@/features/hospital-admin/accessAuditTypes';

interface ComplianceRemindersCardProps {
  reminders: ComplianceReminderItem[];
}

export const ComplianceRemindersCard: React.FC<ComplianceRemindersCardProps> = ({
  reminders,
}) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'check':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'calendar':
        return <FileCheck className="w-4 h-4 text-emerald-600" />;
      case 'user-badge':
        return <UserCheck className="w-4 h-4 text-[#0066FF]" />;
      case 'clock':
      default:
        return <Clock className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-4 pb-2 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-sm text-slate-900">
            Compliance & Reminders
          </h3>
        </div>

        {/* Reminders List */}
        <div className="space-y-3.5 pt-1">
          {reminders.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-start gap-2.5 min-w-0">
                <div className="mt-0.5 shrink-0">
                  {getIcon(item.iconType)}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-slate-800 truncate">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                    {item.description}
                  </p>
                </div>
              </div>

              {item.statusType === 'green' ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0] shrink-0">
                  {item.status}
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EFF6FF] text-[#0066FF] border border-[#BFDBFE]/60 shrink-0">
                  {item.status}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
