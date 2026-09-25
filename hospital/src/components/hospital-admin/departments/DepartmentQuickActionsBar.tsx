'use client';

import React from 'react';
import { Zap, Plus, UserCheck, FileDown } from 'lucide-react';

interface DepartmentQuickActionsBarProps {
  onAddDepartment: () => void;
  onAssignHead: () => void;
  onExport: () => void;
}

export const DepartmentQuickActionsBar: React.FC<
  DepartmentQuickActionsBarProps
> = ({ onAddDepartment, onAssignHead, onExport }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:px-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6">
      {/* Left: Quick Actions Info */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
          <Zap className="w-4 h-4" strokeWidth={2.4} />
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-900">Quick Actions</h4>
          <p className="text-[11px] text-slate-400">
            Manage departments and organizational structure
          </p>
        </div>
      </div>

      {/* Right: Action Buttons */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* + Add Department */}
        <button
          type="button"
          onClick={onAddDepartment}
          className="h-9 px-4 rounded-xl bg-[#0066FF] hover:bg-blue-600 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-98"
        >
          <Plus className="w-4 h-4" strokeWidth={2.4} />
          <span>Add Department</span>
        </button>

        {/* Assign Department Head */}
        <button
          type="button"
          onClick={onAssignHead}
          className="h-9 px-4 rounded-xl border border-blue-200 text-[#0066FF] hover:bg-blue-50/80 font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-98"
        >
          <UserCheck className="w-4 h-4" />
          <span>Assign Department Head</span>
        </button>

        {/* Export Department List */}
        <button
          type="button"
          onClick={onExport}
          className="h-9 px-4 rounded-xl border border-blue-200 text-[#0066FF] hover:bg-blue-50/80 font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-98"
        >
          <FileDown className="w-4 h-4" />
          <span>Export Department List</span>
        </button>
      </div>
    </div>
  );
};
