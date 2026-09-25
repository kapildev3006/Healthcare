'use client';

import React from 'react';
import { Settings, RotateCcw, Save } from 'lucide-react';

interface SaveBarProps {
  onReset: () => void;
  onSave: () => void;
  isSaving?: boolean;
}

export const SaveBar: React.FC<SaveBarProps> = ({
  onReset,
  onSave,
  isSaving = false,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Left description */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
          <Settings className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-sm text-slate-900 leading-tight">
            Save Changes
          </h3>
          <p className="text-[11.5px] text-slate-500 mt-0.5">
            Update your security and system settings
          </p>
        </div>
      </div>

      {/* Right buttons */}
      <div className="flex items-center gap-3 self-end sm:self-auto">
        <button
          type="button"
          onClick={onReset}
          className="px-4 py-2 rounded-xl border border-blue-200 hover:border-blue-300 bg-white hover:bg-slate-50 text-[#0066FF] font-semibold text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-2xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to Default</span>
        </button>

        <button
          type="button"
          disabled={isSaving}
          onClick={onSave}
          className="px-5 py-2 rounded-xl bg-[#0066FF] hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-xs disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>
    </div>
  );
};
