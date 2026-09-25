'use client';

import React from 'react';
import { Lock } from 'lucide-react';

interface AuthenticationSettingsCardProps {
  twoFactorAuth: boolean;
  allowSmsAuth: boolean;
  allowAuthenticatorApp: boolean;
  emailVerification: boolean;
  singleSignOn: boolean;
  onChange: (field: string, value: any) => void;
}

export const AuthenticationSettingsCard: React.FC<AuthenticationSettingsCardProps> = ({
  twoFactorAuth,
  allowSmsAuth,
  allowAuthenticatorApp,
  emailVerification,
  singleSignOn,
  onChange,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-start gap-2.5 mb-4 pb-2 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0 mt-0.5">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 tracking-tight">
              Authentication Settings
            </h3>
            <p className="text-[11px] text-slate-500">
              Configure authentication and two-factor requirements.
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-3 text-xs">
          {/* 1. Two-Factor Authentication */}
          <div className="flex items-center justify-between gap-3">
            <label className="font-medium text-slate-700 text-xs shrink-0">
              Two-Factor Authentication
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                role="switch"
                aria-checked={twoFactorAuth}
                onClick={() => onChange('twoFactorAuth', !twoFactorAuth)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  twoFactorAuth ? 'bg-[#0066FF]' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    twoFactorAuth ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className="text-[11px] text-slate-500 min-w-32">
                Required for all users
              </span>
            </div>
          </div>

          {/* 2. Allow SMS Authentication */}
          <div className="flex items-center justify-between gap-3">
            <label className="font-medium text-slate-700 text-xs shrink-0">
              Allow SMS Authentication
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                role="switch"
                aria-checked={allowSmsAuth}
                onClick={() => onChange('allowSmsAuth', !allowSmsAuth)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  allowSmsAuth ? 'bg-[#0066FF]' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    allowSmsAuth ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className="text-[11px] text-transparent min-w-32 select-none">
                Placeholder
              </span>
            </div>
          </div>

          {/* 3. Allow Authenticator App */}
          <div className="flex items-center justify-between gap-3">
            <label className="font-medium text-slate-700 text-xs shrink-0">
              Allow Authenticator App
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                role="switch"
                aria-checked={allowAuthenticatorApp}
                onClick={() => onChange('allowAuthenticatorApp', !allowAuthenticatorApp)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  allowAuthenticatorApp ? 'bg-[#0066FF]' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    allowAuthenticatorApp ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className="text-[11px] text-transparent min-w-32 select-none">
                Placeholder
              </span>
            </div>
          </div>

          {/* 4. Email Verification */}
          <div className="flex items-center justify-between gap-3">
            <label className="font-medium text-slate-700 text-xs shrink-0">
              Email Verification
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                role="switch"
                aria-checked={emailVerification}
                onClick={() => onChange('emailVerification', !emailVerification)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  emailVerification ? 'bg-[#0066FF]' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    emailVerification ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className="text-[11px] text-slate-500 min-w-32">
                For new user accounts
              </span>
            </div>
          </div>

          {/* 5. Single Sign-On (SSO) */}
          <div className="flex items-center justify-between gap-3">
            <label className="font-medium text-slate-700 text-xs shrink-0">
              Single Sign-On (SSO)
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                role="switch"
                aria-checked={singleSignOn}
                onClick={() => onChange('singleSignOn', !singleSignOn)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  singleSignOn ? 'bg-[#0066FF]' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    singleSignOn ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className="text-[11px] text-slate-400 min-w-32">
                SAML / OAuth (Optional)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
