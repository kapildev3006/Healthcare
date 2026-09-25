'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Bell, ChevronDown, User, Settings, LogOut, ShieldCheck } from 'lucide-react';

interface DoctorHeaderProps {
  onSearchClick?: () => void;
  onNotificationsClick?: () => void;
}

export function DoctorHeader({
  onSearchClick,
  onNotificationsClick,
}: DoctorHeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="h-18 bg-white border-b border-slate-200/80 px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Global Patient Search Bar */}
      <div className="flex-1 max-w-2xl">
        <div
          onClick={onSearchClick}
          className="relative flex items-center cursor-pointer group"
        >
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-hover:text-blue-500 transition-colors">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            readOnly
            placeholder="Search patients by name, UHID, phone, or Health ID..."
            className="w-full pl-10 pr-20 py-2.5 bg-slate-50/80 hover:bg-slate-100/70 border border-slate-200/90 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="px-2 py-0.5 text-[11px] font-semibold text-slate-500 bg-white border border-slate-200 rounded-md shadow-2xs font-mono">
              Ctrl + K
            </span>
          </div>
        </div>
      </div>

      {/* Right Controls: Notifications & Doctor Profile */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button
          onClick={onNotificationsClick}
          aria-label="Doctor Notifications"
          className="relative p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors focus:outline-none"
        >
          <Bell className="w-5 h-5 text-blue-600" />
          <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-xs">
            3
          </span>
        </button>

        <div className="h-7 w-px bg-slate-200 mx-1" />

        {/* Doctor User Badge */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-slate-50 transition-colors focus:outline-none text-left"
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-slate-200/80 shadow-2xs">
              <Image
                src="/doctor_kapil_dev.jpg"
                alt="Dr. Kapil Dev"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-slate-900 leading-tight">
                  Dr. Kapil Dev
                </span>
              </div>
              <span className="text-xs text-slate-500 leading-tight block font-medium">
                General Physician
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs text-slate-400 font-medium">Signed in as</p>
                <p className="text-sm font-bold text-slate-900">Dr. Kapil Dev</p>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 mt-1">
                  <ShieldCheck className="w-3 h-3" /> Verified Practitioner
                </span>
              </div>
              <Link
                href="/doctor/profile"
                className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                onClick={() => setIsProfileOpen(false)}
              >
                <User className="w-4 h-4 text-slate-400" />
                <span>My Profile</span>
              </Link>
              <Link
                href="/doctor/settings"
                className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                onClick={() => setIsProfileOpen(false)}
              >
                <Settings className="w-4 h-4 text-slate-400" />
                <span>Settings & Preferences</span>
              </Link>
              <div className="my-1 border-t border-slate-100" />
              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  alert('Logging out of Doctor session...');
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
              >
                <LogOut className="w-4 h-4 text-red-500" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
