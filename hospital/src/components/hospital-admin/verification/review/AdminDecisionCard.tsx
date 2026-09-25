'use client';

import React from 'react';
import { ShieldCheck, Check, X, MessageSquare } from 'lucide-react';

interface AdminDecisionCardProps {
  onApprove?: () => void;
  onReject?: () => void;
  onRequestInfo?: () => void;
}

export const AdminDecisionCard: React.FC<AdminDecisionCardProps> = ({
  onApprove,
  onReject,
  onRequestInfo,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
      {/* Header */}
      <div className="flex items-center gap-2 pb-3.5 mb-4 border-b border-slate-100">
        <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
          <ShieldCheck className="w-4 h-4" strokeWidth={2.4} />
        </div>
        <h3 className="text-sm font-bold text-slate-900 tracking-tight">
          Admin Decision
        </h3>
      </div>

      {/* 3 Decision Action Buttons */}
      <div className="space-y-3">
        {/* 1. Approve Doctor */}
        <button
          type="button"
          onClick={onApprove}
          className="w-full p-3.5 rounded-xl bg-[#0066FF] hover:bg-blue-600 text-white flex items-center gap-3 transition-all cursor-pointer shadow-xs active:scale-98 text-left"
        >
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
            <Check className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <span className="block text-xs font-bold leading-tight">
              Approve Doctor
            </span>
            <span className="block text-[11px] text-blue-100 font-normal mt-0.5">
              Grant hospital access and activate account
            </span>
          </div>
        </button>

        {/* 2. Reject Application */}
        <button
          type="button"
          onClick={onReject}
          className="w-full p-3.5 rounded-xl border border-red-200 bg-red-50/50 hover:bg-red-50 text-slate-800 flex items-center gap-3 transition-all cursor-pointer active:scale-98 text-left"
        >
          <div className="w-8 h-8 rounded-lg bg-red-100 text-[#DC2626] flex items-center justify-center shrink-0">
            <X className="w-4 h-4" strokeWidth={2.5} />
          </div>
          <div>
            <span className="block text-xs font-bold text-[#DC2626] leading-tight">
              Reject Application
            </span>
            <span className="block text-[11px] text-slate-500 font-normal mt-0.5">
              Decline this application
            </span>
          </div>
        </button>

        {/* 3. Request More Information */}
        <button
          type="button"
          onClick={onRequestInfo}
          className="w-full p-3.5 rounded-xl border border-blue-200 bg-blue-50/50 hover:bg-blue-50 text-slate-800 flex items-center gap-3 transition-all cursor-pointer active:scale-98 text-left"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#0066FF] flex items-center justify-center shrink-0">
            <MessageSquare className="w-4 h-4" strokeWidth={2.2} />
          </div>
          <div>
            <span className="block text-xs font-bold text-[#0066FF] leading-tight">
              Request More Information
            </span>
            <span className="block text-[11px] text-slate-500 font-normal mt-0.5">
              Ask for additional documents or details
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};
