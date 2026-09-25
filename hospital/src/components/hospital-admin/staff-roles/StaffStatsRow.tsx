'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Users, Shield, Mail, UserCheck } from 'lucide-react';
import { StaffStats } from '@/features/hospital-admin/staffRolesTypes';

interface StaffStatsRowProps {
  stats: StaffStats;
}

export const StaffStatsRow: React.FC<StaffStatsRowProps> = ({ stats }) => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Total Staff */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex items-center gap-3 hover:border-blue-200 transition-all">
        <div className="w-11 h-11 rounded-2xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
          <Users className="w-5 h-5" strokeWidth={2.2} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-slate-500 font-medium">Total Staff</p>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              {stats.totalStaff}
            </span>
            <span className="text-xs font-semibold text-emerald-600">
              {stats.totalStaffTrend}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5 truncate">
            All hospital staff members
          </p>
        </div>
      </div>

      {/* 2. Role Groups */}
      <div
        onClick={() => router.push('/hospital-admin/staff-roles/permissions')}
        className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex items-center gap-3 hover:border-purple-300 hover:shadow-sm transition-all cursor-pointer group"
      >
        <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          <Shield className="w-5 h-5" strokeWidth={2.2} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500 font-medium group-hover:text-purple-600 transition-colors">Role Groups</p>
            <span className="text-[10px] text-purple-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">View →</span>
          </div>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              {stats.roleGroups}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5 truncate">
            Predefined role categories
          </p>
        </div>
      </div>

      {/* 3. Pending Invitations */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex items-center gap-3 hover:border-red-200 transition-all">
        <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
          <Mail className="w-5 h-5" strokeWidth={2.2} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-slate-500 font-medium">Pending Invitations</p>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              {stats.pendingInvitations}
            </span>
            <span className="text-xs font-semibold text-rose-500">
              {stats.pendingInvitationsTrend}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5 truncate">
            Awaiting user activation
          </p>
        </div>
      </div>

      {/* 4. Active Users */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex items-center gap-3 hover:border-emerald-200 transition-all">
        <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <UserCheck className="w-5 h-5" strokeWidth={2.2} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-slate-500 font-medium">Active Users</p>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              {stats.activeUsers}
            </span>
            <span className="text-xs font-semibold text-emerald-600">
              {stats.activeUsersTrend}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5 truncate">
            Currently able to access
          </p>
        </div>
      </div>
    </div>
  );
};
