'use client';

import React from 'react';
import { Users, UserCog, Stethoscope, HeartHandshake, ShieldAlert } from 'lucide-react';
import { StaffRoleCount } from '../../features/hospital-admin/types';

interface StaffRolesCardProps {
  roles: StaffRoleCount[];
}

export const StaffRolesCard: React.FC<StaffRolesCardProps> = ({ roles }) => {
  const getRoleIcon = (roleName: string) => {
    switch (roleName) {
      case 'Administrators':
        return (
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
            <UserCog className="w-4 h-4" />
          </div>
        );
      case 'Doctors':
        return (
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            <Stethoscope className="w-4 h-4" />
          </div>
        );
      case 'Nurses':
        return (
          <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
            <HeartHandshake className="w-4 h-4" />
          </div>
        );
      case 'Support Staff':
        return (
          <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
            <Users className="w-4 h-4" />
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
            <Users className="w-4 h-4" />
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center gap-2 pb-3.5 border-b border-slate-100">
          <Users className="w-5 h-5 text-[#1877F2]" strokeWidth={2.2} />
          <h3 className="font-bold text-[14.5px] text-slate-900">
            Staff & Roles Snapshot
          </h3>
        </div>

        {/* Roles List */}
        <div className="mt-4 space-y-4">
          {roles.map((item) => (
            <div
              key={item.role}
              className="flex items-center justify-between py-0.5"
            >
              <div className="flex items-center gap-3">
                {getRoleIcon(item.role)}
                <span className="text-[13px] font-medium text-slate-700">
                  {item.role}
                </span>
              </div>
              <span className="text-[13.5px] font-bold text-slate-900 font-mono">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
