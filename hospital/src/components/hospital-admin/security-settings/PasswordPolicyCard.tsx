'use client';

import React from 'react';
import { Key, ChevronDown } from 'lucide-react';

interface PasswordPolicyCardProps {
  minPasswordLength: string;
  requireUppercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  passwordExpiry: string;
  onChange: (field: string, value: any) => void;
}

export const PasswordPolicyCard: React.FC<PasswordPolicyCardProps> = ({
  minPasswordLength,
  requireUppercase,
  requireNumbers,
  requireSpecialChars,
  passwordExpiry,
  onChange,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-start gap-2.5 mb-4 pb-2 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0 mt-0.5">
            <Key className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 tracking-tight">
              Password Policy
            </h3>
            <p className="text-[11px] text-slate-500">
              Set password requirements for all users.
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-3 text-xs">
          {/* 1. Minimum Length */}
          <div className="flex items-center justify-between gap-3">
            <label className="font-medium text-slate-700 text-xs shrink-0">
              Minimum Length
            </label>
            <div className="relative w-40 sm:w-48">
              <select
                value={minPasswordLength}
                onChange={(e) => onChange('minPasswordLength', e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 pr-7 text-slate-800 font-medium appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="8 characters">8 characters</option>
                <option value="10 characters">10 characters</option>
                <option value="12 characters">12 characters</option>
                <option value="16 characters">16 characters</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* 2. Require Uppercase */}
          <div className="flex items-center justify-between gap-3">
            <label className="font-medium text-slate-700 text-xs shrink-0">
              Require Uppercase
            </label>
            <button
              type="button"
              role="switch"
              aria-checked={requireUppercase}
              onClick={() => onChange('requireUppercase', !requireUppercase)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                requireUppercase ? 'bg-[#0066FF]' : 'bg-slate-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  requireUppercase ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* 3. Require Numbers */}
          <div className="flex items-center justify-between gap-3">
            <label className="font-medium text-slate-700 text-xs shrink-0">
              Require Numbers
            </label>
            <button
              type="button"
              role="switch"
              aria-checked={requireNumbers}
              onClick={() => onChange('requireNumbers', !requireNumbers)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                requireNumbers ? 'bg-[#0066FF]' : 'bg-slate-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  requireNumbers ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* 4. Require Special Characters */}
          <div className="flex items-center justify-between gap-3">
            <label className="font-medium text-slate-700 text-xs shrink-0">
              Require Special Characters
            </label>
            <button
              type="button"
              role="switch"
              aria-checked={requireSpecialChars}
              onClick={() => onChange('requireSpecialChars', !requireSpecialChars)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                requireSpecialChars ? 'bg-[#0066FF]' : 'bg-slate-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  requireSpecialChars ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* 5. Password Expiry */}
          <div className="flex items-center justify-between gap-3">
            <label className="font-medium text-slate-700 text-xs shrink-0">
              Password Expiry
            </label>
            <div className="relative w-40 sm:w-48">
              <select
                value={passwordExpiry}
                onChange={(e) => onChange('passwordExpiry', e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 pr-7 text-slate-800 font-medium appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="30 days">30 days</option>
                <option value="60 days">60 days</option>
                <option value="90 days">90 days</option>
                <option value="180 days">180 days</option>
                <option value="Never">Never</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
