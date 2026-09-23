'use client';

import React from 'react';
import { Zap, Plus, FileText, ListFilter, Network } from 'lucide-react';

interface QuickActionsBarProps {
  onAddDoctor: () => void;
  onReviewVerifications: () => void;
  onViewAuditLogs: () => void;
  onManageDepartments: () => void;
}

export const QuickActionsBar: React.FC<QuickActionsBarProps> = ({
  onAddDoctor,
  onReviewVerifications,
  onViewAuditLogs,
  onManageDepartments,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      {/* Left: Quick Actions Title */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#EAF2FD] text-[#1877F2] flex items-center justify-center shrink-0">
          <Zap className="w-5 h-5 fill-[#1877F2]" />
        </div>
        <div>
          <h4 className="font-bold text-sm text-slate-900 leading-tight">
            Quick Actions
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Common administrative tasks
          </p>
        </div>
      </div>

      {/* Right: Action Buttons */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* + Add Doctor */}
        <button
          type="button"
          onClick={onAddDoctor}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1877F2] hover:bg-blue-600 text-white font-semibold text-xs transition-all shadow-xs cursor-pointer active:scale-95"
        >
          <Plus className="w-4 h-4" strokeWidth={2.4} />
          <span>Add Doctor</span>
        </button>

        {/* Review Verifications */}
        <button
          type="button"
          onClick={onReviewVerifications}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-blue-50 text-[#1877F2] border border-[#BFDBFE] font-semibold text-xs transition-all cursor-pointer active:scale-95"
        >
          <FileText className="w-4 h-4" />
          <span>Review Verifications</span>
        </button>

        {/* View Audit Logs */}
        <button
          type="button"
          onClick={onViewAuditLogs}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-blue-50 text-[#1877F2] border border-[#BFDBFE] font-semibold text-xs transition-all cursor-pointer active:scale-95"
        >
          <ListFilter className="w-4 h-4" />
          <span>View Audit Logs</span>
        </button>

        {/* Manage Departments */}
        <button
          type="button"
          onClick={onManageDepartments}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-blue-50 text-[#1877F2] border border-[#BFDBFE] font-semibold text-xs transition-all cursor-pointer active:scale-95"
        >
          <Network className="w-4 h-4" />
          <span>Manage Departments</span>
        </button>
      </div>
    </div>
  );
};
