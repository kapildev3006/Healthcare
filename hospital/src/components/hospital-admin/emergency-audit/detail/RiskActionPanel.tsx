'use client';

import React from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  Check,
  Download,
  ExternalLink,
} from 'lucide-react';

interface RiskActionPanelProps {
  isReviewed: boolean;
  onMarkReviewed: () => void;
  onEscalate: () => void;
  onDownloadReport: () => void;
  onViewPatientRecord: () => void;
}

export const RiskActionPanel: React.FC<RiskActionPanelProps> = ({
  isReviewed,
  onMarkReviewed,
  onEscalate,
  onDownloadReport,
  onViewPatientRecord,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-4 pb-2 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 tracking-tight">
            Risk & Action Panel
          </h3>
        </div>

        {/* Severity Banner */}
        <div className="p-3.5 rounded-xl bg-[#FEF2F2] border border-[#FECACA] flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-white text-[#EF4444] flex items-center justify-center shadow-2xs shrink-0">
            <AlertTriangle className="w-5 h-5 text-[#EF4444]" />
          </div>
          <div>
            <span className="font-bold text-sm text-[#DC2626] block leading-tight">
              High Severity
            </span>
            <span className="text-[11px] text-slate-500 mt-0.5 block">
              Emergency break-glass access
            </span>
          </div>
        </div>

        {/* Action Buttons Stack */}
        <div className="space-y-2.5">
          {/* 1. Mark Reviewed */}
          <button
            type="button"
            onClick={onMarkReviewed}
            className={`w-full py-2.5 px-4 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
              isReviewed
                ? 'bg-[#0066FF] hover:bg-blue-700 text-white'
                : 'bg-[#0066FF] hover:bg-blue-700 text-white'
            }`}
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>{isReviewed ? 'Mark Reviewed' : 'Mark Reviewed'}</span>
          </button>

          {/* 2. Escalate for Investigation */}
          <button
            type="button"
            onClick={onEscalate}
            className="w-full py-2.5 px-4 rounded-xl border border-red-200 hover:border-red-300 bg-white hover:bg-red-50/50 text-[#EF4444] font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <AlertTriangle className="w-4 h-4 text-[#EF4444]" />
            <span>Escalate for Investigation</span>
          </button>

          {/* 3. Download Audit Report */}
          <button
            type="button"
            onClick={onDownloadReport}
            className="w-full py-2.5 px-4 rounded-xl border border-blue-200 hover:border-blue-300 bg-white hover:bg-blue-50 text-[#0066FF] font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs"
          >
            <Download className="w-4 h-4" />
            <span>Download Audit Report</span>
          </button>

          {/* 4. View Related Patient Record */}
          <button
            type="button"
            onClick={onViewPatientRecord}
            className="w-full py-2.5 px-4 rounded-xl border border-blue-200 hover:border-blue-300 bg-white hover:bg-blue-50 text-[#0066FF] font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Related Patient Record</span>
          </button>
        </div>
      </div>
    </div>
  );
};
