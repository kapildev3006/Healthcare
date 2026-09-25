'use client';

import React from 'react';
import { Users, ChevronDown } from 'lucide-react';

interface AccessControlCardProps {
  defaultAccessLevel: string;
  sessionTimeout: string;
  requireReauth: boolean;
  restrictExternalAccess: boolean;
  onChange: (field: string, value: any) => void;
}

export const AccessControlCard: React.FC<AccessControlCardProps> = ({
  defaultAccessLevel,
  sessionTimeout,
  requireReauth,
  restrictExternalAccess,
  onChange,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-start gap-2.5 mb-4 pb-2 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0 mt-0.5">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 tracking-tight">
              Access Control
            </h3>
            <p className="text-[11px] text-slate-500">
              Manage who can access hospital data and systems.
            </p>
          </div>
        </div>

        {/* Form Controls */}
        <div className="space-y-3.5 text-xs">
          {/* 1. Default Access Level */}
          <div className="flex items-center justify-between gap-3">
            <label className="font-medium text-slate-700 text-xs shrink-0">
              Default Access Level
            </label>
            <div className="relative w-48 sm:w-56">
              <select
                value={defaultAccessLevel}
                onChange={(e) => onChange('defaultAccessLevel', e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 pr-7 text-slate-800 font-medium appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="Role-based (Recommended)">Role-based (Recommended)</option>
                <option value="Strict Department Only">Strict Department Only</option>
                <option value="Least Privilege Standard">Least Privilege Standard</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* 2. Session Timeout */}
          <div className="flex items-center justify-between gap-3">
            <label className="font-medium text-slate-700 text-xs shrink-0">
              Session Timeout
            </label>
            <div className="relative w-48 sm:w-56">
              <select
                value={sessionTimeout}
                onChange={(e) => onChange('sessionTimeout', e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 pr-7 text-slate-800 font-medium appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="15 minutes">15 minutes</option>
                <option value="30 minutes">30 minutes</option>
                <option value="1 hour">1 hour</option>
                <option value="2 hours">2 hours</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* 3. Require Re-authentication */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <label className="font-medium text-slate-700 text-xs shrink-0">
              Require Re-authentication
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                role="switch"
                aria-checked={requireReauth}
                onClick={() => onChange('requireReauth', !requireReauth)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  requireReauth ? 'bg-[#0066FF]' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    requireReauth ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className="text-[11px] text-slate-500">
                For sensitive actions (e.g., export data)
              </span>
            </div>
          </div>

          {/* 4. Restrict External Access */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <label className="font-medium text-slate-700 text-xs shrink-0">
              Restrict External Access
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                role="switch"
                aria-checked={restrictExternalAccess}
                onClick={() => onChange('restrictExternalAccess', !restrictExternalAccess)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  restrictExternalAccess ? 'bg-[#0066FF]' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    restrictExternalAccess ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className="text-[11px] text-slate-500">
                Allow access only from trusted networks
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
