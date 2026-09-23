'use client';

import React from 'react';
import Image from 'next/image';
import { Search, Bell } from 'lucide-react';

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery = '',
  onSearchChange,
  onNotificationClick,
  onProfileClick,
}) => {
  return (
    <header className="shrink-0 min-h-[68px] h-[68px] bg-[#F4F8FA]/95 backdrop-blur-md px-6 md:px-8 flex items-center justify-between sticky top-0 z-20 border-b border-slate-200/60">
      {/* Search Bar */}
      <div className="relative w-full max-w-lg mr-4">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder="Search doctors, departments, staff, or system logs..."
          className="w-full pl-10 pr-4 py-2.5 bg-white/90 hover:bg-white focus:bg-white text-xs md:text-sm text-slate-800 placeholder-slate-400 rounded-2xl border border-slate-200 focus:outline-hidden focus:border-[#1877F2] focus:ring-2 focus:ring-blue-100 transition-all duration-150 shadow-2xs"
        />
      </div>

      {/* Right Controls: Notifications & User Profile */}
      <div className="flex items-center gap-5 shrink-0">
        {/* Notification Bell with Badge */}
        <button
          type="button"
          onClick={onNotificationClick}
          className="relative w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white/80 transition-colors cursor-pointer shrink-0"
          aria-label="View notifications"
        >
          <Bell className="w-5 h-5 text-slate-600" />
          <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#EF4444] text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
            3
          </span>
        </button>

        {/* User Profile */}
        <div
          onClick={onProfileClick}
          className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity shrink-0"
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200 shadow-xs shrink-0">
            <Image
              src="/avatar_rajesh.jpg"
              alt="Rajesh Kumar"
              width={40}
              height={40}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          <div className="flex flex-col text-left leading-tight shrink-0">
            <span className="font-bold text-[14px] text-slate-900 whitespace-nowrap">
              Rajesh Kumar
            </span>
            <span className="text-[12px] text-slate-500 font-medium whitespace-nowrap">
              Hospital Administrator
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
