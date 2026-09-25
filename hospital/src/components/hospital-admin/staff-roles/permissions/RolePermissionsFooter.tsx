'use client';

import React from 'react';
import { AlertTriangle, Ban, Copy, Save } from 'lucide-react';

interface RolePermissionsFooterProps {
  onDisableRole: () => void;
  onDuplicateRole: () => void;
  onSaveChanges: () => void;
  isSaving?: boolean;
}

export const RolePermissionsFooter: React.FC<RolePermissionsFooterProps> = ({
  onDisableRole,
  onDuplicateRole,
  onSaveChanges,
  isSaving = false,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:px-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
      {/* Left: Danger Zone Info */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
          <AlertTriangle className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-900">Danger Zone</h4>
          <p className="text-[11px] text-slate-500">
            Disabling a role will prevent it from being assigned to new users.
          </p>
        </div>
      </div>

      {/* Right: Action Buttons */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Disable Role */}
        <button
          type="button"
          onClick={onDisableRole}
          className="h-9 px-4 rounded-xl bg-white border border-red-200 hover:bg-red-50/60 text-red-600 font-semibold text-xs flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
        >
          <Ban className="w-3.5 h-3.5" />
          <span>Disable Role</span>
        </button>

        {/* Duplicate Role */}
        <button
          type="button"
          onClick={onDuplicateRole}
          className="h-9 px-4 rounded-xl bg-white border border-blue-200 hover:bg-blue-50/60 text-[#0066FF] font-semibold text-xs flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
        >
          <Copy className="w-3.5 h-3.5" />
          <span>Duplicate Role</span>
        </button>

        {/* Save Changes */}
        <button
          type="button"
          onClick={onSaveChanges}
          disabled={isSaving}
          className="h-9 px-5 rounded-xl bg-[#0066FF] hover:bg-blue-600 disabled:opacity-50 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-all active:scale-98 cursor-pointer"
        >
          <Save className="w-3.5 h-3.5" />
          <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>
    </div>
  );
};
