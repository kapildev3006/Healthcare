'use client';

import React from 'react';
import { Mail, CheckCircle2, ExternalLink } from 'lucide-react';

interface DetailPatientNotificationCardProps {
  onViewDetails?: () => void;
}

export const DetailPatientNotificationCard: React.FC<DetailPatientNotificationCardProps> = ({
  onViewDetails,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-3.5 pb-2 border-b border-slate-100">
        <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
          <Mail className="w-4 h-4" />
        </div>
        <h3 className="font-bold text-sm text-slate-900 tracking-tight">
          Patient Notification Status
        </h3>
      </div>

      {/* Main notification alert box */}
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
          <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-bold text-xs text-slate-900">
            Patient Notified
          </p>
          <p className="text-[11.5px] text-slate-500 mt-0.5 leading-relaxed">
            Patient was notified of this emergency access on Jun 12, 2025 at 08:30 AM (via patient portal and email).
          </p>
        </div>
      </div>

      {/* Action button */}
      <div className="mt-3.5 pt-1">
        <button
          type="button"
          onClick={onViewDetails}
          className="w-full py-2 px-3 rounded-xl border border-blue-200 bg-white hover:bg-blue-50 text-[#0066FF] font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>View Notification Details</span>
        </button>
      </div>
    </div>
  );
};
