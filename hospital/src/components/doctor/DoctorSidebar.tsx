'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  LayoutDashboard,
  Search,
  AlertTriangle,
  Users,
  CalendarDays,
  FileText,
  Brain,
  KeyRound,
  Bell,
  Settings,
  Activity,
} from 'lucide-react';

interface DoctorSidebarProps {
  accessRequestsCount?: number;
  notificationsCount?: number;
}

export function DoctorSidebar({
  accessRequestsCount = 3,
  notificationsCount = 5,
}: DoctorSidebarProps) {
  const pathname = usePathname();

  const navItems = [
    {
      name: 'Dashboard',
      href: '/doctor',
      icon: LayoutDashboard,
      isEmergency: false,
    },
    {
      name: 'Patient Search',
      href: '/doctor/patient-search',
      icon: Search,
      isEmergency: false,
    },
    {
      name: 'Emergency Lookup',
      href: '/doctor/emergency-lookup',
      icon: AlertTriangle,
      isEmergency: true,
    },
    {
      name: 'My Patients',
      href: '/doctor/patients',
      icon: Users,
      isEmergency: false,
    },
    {
      name: 'Encounters',
      href: '/doctor/encounters',
      icon: CalendarDays,
      isEmergency: false,
    },
    {
      name: 'Reports',
      href: '/doctor/reports',
      icon: FileText,
      isEmergency: false,
    },
    {
      name: 'AI Analysis',
      href: '/doctor/ai-analysis',
      icon: Brain,
      isEmergency: false,
    },
    {
      name: 'Access Requests',
      href: '/doctor/access-requests',
      icon: KeyRound,
      badge: accessRequestsCount,
      isEmergency: false,
    },
    {
      name: 'Notifications',
      href: '/doctor/notifications',
      icon: Bell,
      badge: notificationsCount,
      isEmergency: false,
    },
    {
      name: 'Profile & Settings',
      href: '/doctor/settings',
      icon: Settings,
      isEmergency: false,
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between shrink-0 select-none h-screen sticky top-0 left-0 sidebar-scroll z-30">
      {/* Brand Header */}
      <div>
        <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3">
          {/* Logo Cross */}
          <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/20">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 text-white"
                fill="currentColor"
              >
                <path d="M10 3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v6h6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-6v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-6H4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h6V3z" />
              </svg>
            </div>
            {/* Cyan dot accent */}
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-cyan-400 border-2 border-white" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xl tracking-tight text-slate-900">
                Medi<span className="text-blue-600">Link</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-tight font-medium">
              Connected Care. Better Outcomes.
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-3.5 space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === '/doctor'
                ? pathname === '/doctor' || pathname === '/doctor/dashboard'
                : item.href === '/doctor/emergency-lookup'
                ? pathname === '/doctor/emergency-lookup' || pathname === '/doctor/emergency-break-glass'
                : pathname.startsWith(item.href);

            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25 font-semibold'
                    : item.isEmergency
                    ? 'text-red-600 hover:bg-red-50/70'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-105 ${
                      isActive
                        ? 'text-white'
                        : item.isEmergency
                        ? 'text-red-500'
                        : 'text-slate-500 group-hover:text-slate-800'
                    }`}
                  />
                  <span>{item.name}</span>
                </div>

                {/* Badge if present */}
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-bold leading-none ${
                      isActive
                        ? 'bg-white text-blue-700'
                        : 'bg-red-500 text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Promo Stethoscope Card & App Version */}
      <div className="p-4 space-y-4">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-blue-50/70 to-slate-50/80 border border-blue-100/80 p-4">
          <div className="flex items-center justify-center mb-3">
            <div className="relative w-28 h-28 drop-shadow-sm">
              <Image
                src="/sidebar_stethoscope.jpg"
                alt="Stethoscope illustration"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          <div className="space-y-1">
            <h4 className="text-base font-bold text-slate-800 italic leading-snug">
              Better Data.
              <br />
              Brighter Care.
            </h4>
            <div className="w-8 h-1 bg-blue-600 rounded-full mt-1.5" />
          </div>
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1 pt-1 border-t border-slate-100">
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded-full border border-slate-300 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            </div>
            <span className="font-semibold text-slate-600">MediLink</span>
          </div>
          <span className="font-mono text-[11px] text-slate-500">v1.0.0</span>
        </div>
      </div>
    </aside>
  );
}
