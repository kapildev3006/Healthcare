'use client';

import React from 'react';
import { Clock, ChevronDown } from 'lucide-react';

interface SessionManagementCardProps {
  sessionTimeoutDuration: string;
  rememberMeDuration: string;
  concurrentSessions: string;
  showLoginAlerts: boolean;
  onChange: (field: string, value: any) => void;
}

export const SessionManagementCard: React.FC<SessionManagementCardProps> = ({
  sessionTimeoutDuration,
  rememberMeDuration,
  concurrentSessions,
  showLoginAlerts,
  onChange,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-start gap-2.5 mb-4 pb-2 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0 mt-0.5">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 tracking-tight">
              Session Management
            </h3>
            <p className="text-[11px] text-slate-500">
              Control user sessions and access duration.
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-3.5 text-xs">
          {/* 1. Session Timeout */}
          <div className="flex items-center justify-between gap-3">
            <label className="font-medium text-slate-700 text-xs shrink-0">
              Session Timeout
            </label>
            <div className="relative w-48 sm:w-56">
              <select
                value={sessionTimeoutDuration}
                onChange={(e) => onChange('sessionTimeoutDuration', e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 pr-7 text-slate-800 font-medium appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="15 minutes">15 minutes</option>
                <option value="30 minutes">30 minutes</option>
                <option value="1 hour">1 hour</option>
                <option value="4 hours">4 hours</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* 2. Remember Me Duration */}
          <div className="flex items-center justify-between gap-3">
            <label className="font-medium text-slate-700 text-xs shrink-0">
              Remember Me Duration
            </label>
            <div className="relative w-48 sm:w-56">
              <select
                value={rememberMeDuration}
                onChange={(e) => onChange('rememberMeDuration', e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 pr-7 text-slate-800 font-medium appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="24 hours">24 hours</option>
                <option value="7 days">7 days</option>
                <option value="14 days">14 days</option>
                <option value="30 days">30 days</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* 3. Concurrent Sessions */}
          <div className="flex items-center justify-between gap-3">
            <label className="font-medium text-slate-700 text-xs shrink-0">
              Concurrent Sessions
            </label>
            <div className="relative w-48 sm:w-56">
              <select
                value={concurrentSessions}
                onChange={(e) => onChange('concurrentSessions', e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 pr-7 text-slate-800 font-medium appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="Single device only">Single device only</option>
                <option value="Limit to 2 devices">Limit to 2 devices</option>
                <option value="Limit to 3 devices">Limit to 3 devices</option>
                <option value="Unlimited">Unlimited</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* 4. Show Login Alerts */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <label className="font-medium text-slate-700 text-xs shrink-0">
              Show Login Alerts
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                role="switch"
                aria-checked={showLoginAlerts}
                onClick={() => onChange('showLoginAlerts', !showLoginAlerts)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  showLoginAlerts ? 'bg-[#0066FF]' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    showLoginAlerts ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className="text-[11px] text-slate-500">
                Email on new device login
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
