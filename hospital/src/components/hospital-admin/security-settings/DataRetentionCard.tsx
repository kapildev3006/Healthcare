'use client';

import React from 'react';
import { Database, ChevronDown } from 'lucide-react';

interface DataRetentionCardProps {
  patientRecordsRetention: string;
  accessLogsRetention: string;
  systemLogsRetention: string;
  autoDeleteOldLogs: boolean;
  onChange: (field: string, value: any) => void;
}

export const DataRetentionCard: React.FC<DataRetentionCardProps> = ({
  patientRecordsRetention,
  accessLogsRetention,
  systemLogsRetention,
  autoDeleteOldLogs,
  onChange,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-start gap-2.5 mb-4 pb-2 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0 mt-0.5">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 tracking-tight">
              Data Retention
            </h3>
            <p className="text-[11px] text-slate-500">
              Manage how long hospital data is retained.
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-3.5 text-xs">
          {/* 1. Patient Records */}
          <div className="flex items-center justify-between gap-3">
            <label className="font-medium text-slate-700 text-xs shrink-0">
              Patient Records
            </label>
            <div className="relative w-48 sm:w-56">
              <select
                value={patientRecordsRetention}
                onChange={(e) => onChange('patientRecordsRetention', e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 pr-7 text-slate-800 font-medium appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="5 years">5 years</option>
                <option value="7 years (HIPAA)">7 years (HIPAA)</option>
                <option value="10 years">10 years</option>
                <option value="Permanent (Indefinite)">Permanent (Indefinite)</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* 2. Access Logs */}
          <div className="flex items-center justify-between gap-3">
            <label className="font-medium text-slate-700 text-xs shrink-0">
              Access Logs
            </label>
            <div className="relative w-48 sm:w-56">
              <select
                value={accessLogsRetention}
                onChange={(e) => onChange('accessLogsRetention', e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 pr-7 text-slate-800 font-medium appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="1 year">1 year</option>
                <option value="2 years">2 years</option>
                <option value="3 years">3 years</option>
                <option value="6 years (ABDM)">6 years (ABDM)</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* 3. System Logs */}
          <div className="flex items-center justify-between gap-3">
            <label className="font-medium text-slate-700 text-xs shrink-0">
              System Logs
            </label>
            <div className="relative w-48 sm:w-56">
              <select
                value={systemLogsRetention}
                onChange={(e) => onChange('systemLogsRetention', e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 pr-7 text-slate-800 font-medium appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="6 months">6 months</option>
                <option value="1 year">1 year</option>
                <option value="2 years">2 years</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* 4. Auto-Delete Old Logs */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <label className="font-medium text-slate-700 text-xs shrink-0">
              Auto-Delete Old Logs
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                role="switch"
                aria-checked={autoDeleteOldLogs}
                onClick={() => onChange('autoDeleteOldLogs', !autoDeleteOldLogs)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  autoDeleteOldLogs ? 'bg-[#0066FF]' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    autoDeleteOldLogs ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className="text-[11px] text-slate-600 font-medium">
                Enabled
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
