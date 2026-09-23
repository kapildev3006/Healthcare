'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Building2,
  UserCheck,
  UserPlus,
  ShieldCheck,
  Network,
  Users,
  FileText,
  AlertTriangle,
  Settings,
  Bell,
  Activity,
} from 'lucide-react';

interface SidebarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
}) => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/hospital-admin' },
    { name: 'Hospital Profile', icon: Building2, href: '/hospital-admin/profile' },
    { name: 'Doctor Management', icon: UserCheck, href: '/hospital-admin/doctors' },
    { name: 'Add Doctor', icon: UserPlus, href: '/hospital-admin/doctors/add' },
    { name: 'Doctor Verification', icon: ShieldCheck, href: '#doctor-verification' },
    { name: 'Departments', icon: Network, href: '#departments' },
    { name: 'Staff & Roles', icon: Users, href: '#staff-roles' },
    { name: 'Access Audit Logs', icon: FileText, href: '#access-audit' },
    { name: 'Emergency Access Audit', icon: AlertTriangle, href: '#emergency-audit' },
    { name: 'Security & Settings', icon: Settings, href: '#security-settings' },
    { name: 'Notifications', icon: Bell, href: '#notifications' },
  ];

  return (
    <aside className="w-64 min-w-64 bg-gradient-to-b from-[#EFF6FD] via-[#F3F8FE] to-[#E7F3FD] border-r border-[#D9E8F7] flex flex-col justify-between h-screen sticky top-0 left-0 select-none z-30">
      <div className="flex flex-col flex-1 overflow-y-auto pt-4 pb-3 px-3.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Top Hospital Branding */}
        <Link
          href="/hospital-admin"
          className="flex items-center gap-3 px-2 pb-4 mb-2.5 border-b border-blue-100/60 shrink-0 hover:opacity-95 transition-opacity"
        >
          <div className="w-9 h-9 rounded-xl bg-[#1877F2] text-white flex items-center justify-center shadow-xs shrink-0">
            {/* Medical Cross SVG */}
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5h5a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-5v5a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-5H5a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h5V4z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[16px] text-slate-900 tracking-tight leading-snug">
              AI Healthcare
            </span>
            <span className="text-[11.5px] font-medium text-slate-500 leading-none">
              CityCare Hospital
            </span>
          </div>
        </Link>

        {/* Navigation Items List */}
        <nav className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isRouteMatch =
              item.href.startsWith('/') && pathname === item.href;
            const isActive = activeTab ? activeTab === item.name : isRouteMatch;

            const buttonContent = (
              <>
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-[#1877F2]' : 'text-slate-500'
                  }`}
                  strokeWidth={isActive ? 2.2 : 1.9}
                />
                <span className="truncate">{item.name}</span>
              </>
            );

            const className = `w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-medium transition-all duration-150 text-left ${
              isActive
                ? 'bg-white text-[#1877F2] font-semibold shadow-xs border border-blue-200/70'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`;

            if (item.href.startsWith('/')) {
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => onTabChange?.(item.name)}
                  className={className}
                >
                  {buttonContent}
                </Link>
              );
            }

            return (
              <button
                key={item.name}
                type="button"
                onClick={() => onTabChange?.(item.name)}
                className={className}
              >
                {buttonContent}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Healthier Tomorrow Callout Card */}
      <div className="p-3 border-t border-blue-100/70 shrink-0">
        <div className="bg-white/80 backdrop-blur-xs border border-blue-200/70 rounded-2xl p-3 text-center shadow-xs">
          <div className="w-7 h-7 rounded-full bg-[#EBF4FE] text-[#1877F2] flex items-center justify-center mx-auto shadow-2xs mb-1.5">
            <Activity className="w-3.5 h-3.5 text-[#1877F2]" strokeWidth={2.2} />
          </div>
          <p className="font-semibold text-xs text-slate-800 leading-tight">
            Building a Safer
            <br />
            Healthier Tomorrow
          </p>
          <div className="mt-2 pt-1.5 border-t border-blue-100/80 text-[10.5px] text-slate-500 leading-snug">
            <p className="font-medium text-slate-600">AI Healthcare</p>
            <p>CityCare Hospital</p>
            <p className="text-[10px] text-slate-400 mt-0.5">v1.0.0</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
