'use client';

import React from 'react';
import {
  Settings,
  FileText,
  ShieldCheck,
  Key,
  Cog,
  Mail,
  Bell,
} from 'lucide-react';
import { NotificationPreferencesState } from '@/features/hospital-admin/notificationTypes';

interface NotificationPreferencesSidebarCardProps {
  preferences: NotificationPreferencesState;
  onChange: (key: keyof NotificationPreferencesState, value: boolean) => void;
}

export const NotificationPreferencesSidebarCard: React.FC<NotificationPreferencesSidebarCardProps> = ({
  preferences,
  onChange,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
      {/* Header */}
      <div className="flex items-start gap-2.5 mb-4 pb-2 border-b border-slate-100">
        <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0 mt-0.5">
          <Settings className="w-4 h-4" />
        </div>
        <div>
          <h3 className="font-bold text-sm text-slate-900 tracking-tight">
            Notification Preferences
          </h3>
          <p className="text-[11px] text-slate-500">
            Manage how you receive notifications and alerts.
          </p>
        </div>
      </div>

      {/* Preferences List */}
      <div className="space-y-3.5 text-xs">
        {/* 1. Verification Updates */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-start gap-2.5 min-w-0">
            <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
              <FileText className="w-3.5 h-3.5 text-[#16A34A]" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-slate-900 text-xs truncate">
                Verification Updates
              </p>
              <p className="text-[11px] text-slate-400 truncate">
                New doctor/staff verifications
              </p>
            </div>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={preferences.verificationUpdates}
            onClick={() => onChange('verificationUpdates', !preferences.verificationUpdates)}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              preferences.verificationUpdates ? 'bg-[#0066FF]' : 'bg-slate-300'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                preferences.verificationUpdates ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* 2. Security Alerts */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-start gap-2.5 min-w-0">
            <div className="w-6 h-6 rounded-md bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0066FF]" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-slate-900 text-xs truncate">
                Security Alerts
              </p>
              <p className="text-[11px] text-slate-400 truncate">
                Login attempts, security events
              </p>
            </div>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={preferences.securityAlerts}
            onClick={() => onChange('securityAlerts', !preferences.securityAlerts)}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              preferences.securityAlerts ? 'bg-[#0066FF]' : 'bg-slate-300'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                preferences.securityAlerts ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* 3. Access Notifications */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-start gap-2.5 min-w-0">
            <div className="w-6 h-6 rounded-md bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0 mt-0.5">
              <Key className="w-3.5 h-3.5 text-[#0066FF]" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-slate-900 text-xs truncate">
                Access Notifications
              </p>
              <p className="text-[11px] text-slate-400 truncate">
                Emergency access, record access
              </p>
            </div>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={preferences.accessNotifications}
            onClick={() => onChange('accessNotifications', !preferences.accessNotifications)}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              preferences.accessNotifications ? 'bg-[#0066FF]' : 'bg-slate-300'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                preferences.accessNotifications ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* 4. System Updates */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-start gap-2.5 min-w-0">
            <div className="w-6 h-6 rounded-md bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0 mt-0.5">
              <Cog className="w-3.5 h-3.5 text-[#0066FF]" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-slate-900 text-xs truncate">
                System Updates
              </p>
              <p className="text-[11px] text-slate-400 truncate">
                Maintenance, new features
              </p>
            </div>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={preferences.systemUpdates}
            onClick={() => onChange('systemUpdates', !preferences.systemUpdates)}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              preferences.systemUpdates ? 'bg-[#0066FF]' : 'bg-slate-300'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                preferences.systemUpdates ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* 5. Email Notifications */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-start gap-2.5 min-w-0">
            <div className="w-6 h-6 rounded-md bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0 mt-0.5">
              <Mail className="w-3.5 h-3.5 text-[#0066FF]" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-slate-900 text-xs truncate">
                Email Notifications
              </p>
              <p className="text-[11px] text-slate-400 truncate">
                Receive notifications via email
              </p>
            </div>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={preferences.emailNotifications}
            onClick={() => onChange('emailNotifications', !preferences.emailNotifications)}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              preferences.emailNotifications ? 'bg-[#0066FF]' : 'bg-slate-300'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                preferences.emailNotifications ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* 6. Push Notifications */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-start gap-2.5 min-w-0">
            <div className="w-6 h-6 rounded-md bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0 mt-0.5">
              <Bell className="w-3.5 h-3.5 text-[#0066FF]" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-slate-900 text-xs truncate">
                Push Notifications
              </p>
              <p className="text-[11px] text-slate-400 truncate">
                Browser push notifications
              </p>
            </div>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={preferences.pushNotifications}
            onClick={() => onChange('pushNotifications', !preferences.pushNotifications)}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              preferences.pushNotifications ? 'bg-[#0066FF]' : 'bg-slate-300'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                preferences.pushNotifications ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
